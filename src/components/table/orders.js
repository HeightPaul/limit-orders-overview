import {getValue} from '../form/fill.js'
import loadingHtml from '../form/loading.js'
import {getSelectedValues, getLimitOrdersUrl, getFormattedDateTime} from '../../configs/configs.js'
import expiration from '../../contracts/orders/expiration.js'
import getTokensInfo from '../../contracts/abiTokenInfo.js'
import {maker, asset, rates} from '../cell/cell.js'
import chains from '../../configs/chains/chainList.json' assert {type: 'json'}
import {getDataTable, brighter} from './interactive.js'

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
      ordersSection.innerHTML = `${response.status ?? 'No Status'}: ${response.error ?? 'No message'}`
      animation.innerHTML = ''
      return
   }
   const ordersApi = await response.json()
   ordersSection.innerHTML = await ordersTableHtml(ordersApi, chainId)
   animation.innerHTML = ''
   const ordersDataTable = getDataTable(popEmptyBalancesBtn)
   ordersCount.textContent = `Found: ${ordersApi.length}${ordersDataTable.emptyRowsLength ? ` | Empty: ${ordersDataTable.emptyRowsLength}` : ''}`
   brighter()
}

async function ordersTableHtml(orders, chainId) {
   const chain = chains[chainId]
   const tokensInfo = await getTokensInfo(orders, chain)
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
         </tr>
      </thead>
      <tbody>
      ${(await Promise.all(orders.map(async(order) => {
      const expire = parseInt(expiration(order.data, chainId)) * 1000
      return `
         <tr>
            ${maker(order.data.maker, order.makerBalance, chain.scanUrl, tokensInfo[order.data.makerAsset])}
            ${await asset(order.data.makerAsset, order.data.makingAmount, chain, tokensInfo[order.data.makerAsset])}
            ${await asset(order.data.takerAsset, order.data.takingAmount, chain, tokensInfo[order.data.takerAsset])}
            ${rates(order, tokensInfo)}
            <td>${getFormattedDateTime(order.createDateTime)}</td>
            <td>${expire ? getFormattedDateTime(expire) : ''}</td>
         </tr>
      `
   }))).join('')}
      </tbody>
   </table>
   `
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
