import {getValue} from '../form/fill.js'
import loadingHtml from '../form/loading.js'
import {getSelectedValues, getLimitOrdersUrl} from '../../configs/configs.js'
import chains from '../../configs/chains/chainList.json'
import {getDataTable} from './interactive.js'
import {loadWalletDropdown} from './head/wallets.js'
import {tableHtml} from './table.js'
import getTokensInfo from '../../contracts/tokenInfo.js'

export async function loadTable() {
   const animation = document.querySelector('#animation')
   const ordersSection = document.querySelector('#ordersSection')
   const ordersCount = document.querySelector('#ordersCount')
   const popEmptyBalancesBtn = document.querySelector('#popEmptyBalances')
   const rpcUrl = document.querySelector('#rpcUrl')
   const maxBatchSize = document.querySelector('#maxBatchSize')
   const batchError = document.querySelector('#maxBatchSize')

   animation.innerHTML = loadingHtml()
   ordersSection.textContent = ordersCount.textContent = ''
   popEmptyBalancesBtn.style.display = 'none'
   popEmptyBalancesBtn.innerText = '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
   batchError.textContent = ''

   const {response, chainId} = await getOrdersApi(ordersSection, animation)
   if (!response.ok) {
      const result = await response.json()
      ordersSection.innerHTML = `<div class="text-capitalize">${Object.entries(result).map(([key, value]) => `${key}: ${value}`).join('. ')}</div>`
      animation.innerHTML = ''
      return
   }
   const ordersApi = await response.json()
   const chain = chains[chainId]

   const tokensInfo = await getTokensInfo(ordersApi, chain, rpcUrl.value, maxBatchSize.value)
   ordersSection.innerHTML = tableHtml(ordersApi, tokensInfo, chain)
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
