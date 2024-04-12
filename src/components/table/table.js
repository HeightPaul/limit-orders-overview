
import {getFormattedDateTime} from '../../configs/configs'
import {maker, asset, orderRates, prices, currentRates, updateNumberColors} from './rows/cell/cell'
import expiration from '../../contracts/orders/expiration'
import getTokensInfo from '../../contracts/tokenInfo'
import {dropdownHandlers} from './head/wallets'

async function tableHtml(orders, chain, chainId) {
   const tokensInfo = await getTokensInfo(orders, chain.rpcUrl)
   return `
   <table class="table table-striped table-dark" id="ordersTable">
      <thead>
         <tr>
            <th scope="col">Address|Balance</th>
            <th scope="col">Sell</th>
            <th scope="col">Buy</span></th>
            <th scope="col">Rates</th>
            <th scope="col">Creation</th>
            <th scope="col">Expiration</th>
            <th scope="col">Sell</th>
            <th scope="col">24H</th>
            <th scope="col">30D</th>
            <th scope="col">Buy</th>
            <th scope="col">24H</th>
            <th scope="col">30D</th>
            <th scope="col">Rates</th>
         </tr>
      </thead>
      <tbody>
      ${(await Promise.all(orders.map(async(order) => {
      const expire = parseInt(expiration(order.data, chainId))
      const makerTokenInfo = tokensInfo[order.data.makerAsset]
      const takerTokenInfo = tokensInfo[order.data.takerAsset]
      return `
         <tr>
            ${maker(order.data.maker, order.makerBalance, chain.scanUrl, makerTokenInfo)}
            ${await asset(order.data.makerAsset, order.data.makingAmount, chain, makerTokenInfo)}
            ${await asset(order.data.takerAsset, order.data.takingAmount, chain, takerTokenInfo)}
            ${orderRates(order, tokensInfo)}
            <td>${getFormattedDateTime(order.createDateTime)}</td>
            <td>${expire ? getFormattedDateTime(expire * 1000) : ''}</td>
            ${prices(makerTokenInfo)}
            ${prices(takerTokenInfo)}
            ${currentRates(makerTokenInfo, takerTokenInfo)}
         </tr>
      `
   }))).join('')}
      </tbody>
   </table>
   `
}

function tableEvents() {
   const ordersSection = document.querySelector('#ordersSection')

   ordersSection.addEventListener('click', dropdownHandlers)

   const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
         updateNumberColors()
      })
   })
   observer.observe(ordersSection, {
      childList: true,
      subtree: true
   })
}

export {tableHtml, tableEvents}
