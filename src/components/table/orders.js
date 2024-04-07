import {getValue} from '../form/fill.js'
import loadingHtml from '../form/loading.js'
import {getSelectedValues, getLimitOrdersUrl, getFormattedDateTime} from '../../configs/configs.js'
import expiration from '../../contracts/orders/expiration.js'
import getTokensInfo from '../../contracts/tokenInfo.js'
import {maker, asset, rates} from '../cell/cell.js'
import chains from '../../configs/chains/chainList.json' assert {type: 'json'}
import {getDataTable} from './interactive.js'
import {loadWalletDropdown} from './wallets.js'

export async function loadTable() {
   const animation = document.querySelector('#animation')
   const ordersSection = document.querySelector('#ordersSection')
   const ordersCount = document.querySelector('#ordersCount')
   const popEmptyBalancesBtn = document.querySelector('#popEmptyBalances')

   animation.innerHTML = loadingHtml()
   ordersSection.textContent = ordersCount.textContent = ''
   popEmptyBalancesBtn.style.display = 'none'
   popEmptyBalancesBtn.innerText = '🏴󠁧󠁢󠁥󠁮󠁧󠁿'

   const {response, chainId} = await getOrdersApi(ordersSection, animation)
   if (!response.ok) {
      const result = await response.json()
      ordersSection.innerHTML = `<div class="text-capitalize">${Object.entries(result).map(([key, value]) => `${key}: ${value}`).join('. ')}</div>`
      animation.innerHTML = ''
      return
   }
   const ordersApi = await response.json()
   const chain = chains[chainId]
   ordersSection.innerHTML = await tableHtml(ordersApi, chain, chainId)
   animation.innerHTML = ''
   const ordersDataTable = getDataTable(popEmptyBalancesBtn)
   ordersCount.textContent = `Found: ${ordersApi.length}${ordersDataTable.emptyRowsLength ? ` | Empty: ${ordersDataTable.emptyRowsLength}` : ''}`
   loadWalletDropdown(ordersApi, chain.scanUrl)
}

async function getOrdersApi() {
   const fields = {
      makerAsset: getValue('makerAsset'),
      takerAsset: getValue('takerAsset'),
      walletAddress: getValue('walletAddress'),
      chainId: getValue('chainId'),
      statuses: getSelectedValues(document.querySelector('#statuses').options),
      appVersions: getSelectedValues(document.querySelector('#appVersions').options),
   }
   const response = await fetch(getLimitOrdersUrl(fields))
   return {
      response: response,
      chainId: fields.chainId,
   }
}

async function tableHtml(orders, chain, chainId) {
   const tokensInfo = await getTokensInfo(orders, chain.rpcUrl)
   return `
   <table class="table table-striped table-dark" id="ordersTable">
      <thead class="thead-dark">
         <tr>
            <th scope="col">Address|Balance</th>
            <th scope="col">Sell</th>
            <th scope="col">Buy</span></th>
            <th scope="col">Order Rates</th>
            <th scope="col">Creation</th>
            <th scope="col">Expiration</th>
            <th scope="col">Sell - Current Price</th>
            <th scope="col">24 Hours</th>
            <th scope="col">30 Days Days</th>
            <th scope="col">Buy - Current Price</th>
            <th scope="col">24 Hours</th>
            <th scope="col">30 Days Days</th>
            <th scope="col">Current Rates</th>
         </tr>
      </thead>
      <tbody>
      ${(await Promise.all(orders.map(async(order) => {
      const expire = parseInt(expiration(order.data, chainId))
      const makerTokenInfo = tokensInfo[order.data.makerAsset]
      const takerTokenInfo = tokensInfo[order.data.takerAsset]
      const makerTokenPrice = parseFloat(makerTokenInfo.current_price)
      const takerTokenPrice = parseFloat(takerTokenInfo.current_price)
      return `
         <tr>
            ${maker(order.data.maker, order.makerBalance, chain.scanUrl, makerTokenInfo)}
            ${await asset(order.data.makerAsset, order.data.makingAmount, chain, makerTokenInfo)}
            ${await asset(order.data.takerAsset, order.data.takingAmount, chain, takerTokenInfo)}
            ${rates(order, tokensInfo)}
            <td>${getFormattedDateTime(order.createDateTime)}</td>
            <td>${expire ? getFormattedDateTime(expire * 1000) : ''}</td>
            ${priceCells(makerTokenInfo)}
            ${priceCells(takerTokenInfo)}
            <td>
               ${makerTokenInfo.current_price && takerTokenInfo.current_price ? `
               <div>
                  <div>${(makerTokenPrice / takerTokenPrice).toFixed(5)}</div>
                  <div class="text-secondary">${(takerTokenPrice / makerTokenPrice).toFixed(5)}</div>
               </div>`: ''}
            </td>
         </tr>
      `
   }))).join('')}
      </tbody>
   </table>
   `
}

function priceCells(tokenInfo) {
   return `
      <td>${tokenInfo.current_price ? `
         <a target="_blank" href="https://www.coingecko.com/en/coins/${tokenInfo.price_id}"><img class="coingeckoIcon" src="https://avatars.githubusercontent.com/u/7111837?s=280&v=4"/></a>
         $${parseFloat(tokenInfo.current_price.toFixed(8))}` : ''}
      </td>
      <td>
         <span class="${tokenInfo.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}">
            ${tokenInfo.price_change_percentage_24h ? `${tokenInfo.price_change_percentage_24h}%` : ''}
         </span>
      </td>
      <td>
         <span class="${tokenInfo.price_change_percentage_30d >= 0 ? 'text-success' : 'text-danger'}">
            ${tokenInfo.price_change_percentage_30d ? `${tokenInfo.price_change_percentage_30d}%` : ''}
         </span>
      </td>
   `
}
