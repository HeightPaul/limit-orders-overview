import {getValue} from '../form/fill.js';
import loadingHtml from '../form/loading.js';
import {getSelectedValues, getLimitOrdersUrl, getFormattedDateTime} from '../../configs/index.js';
import expiration from '../../contracts/orders/expiration.js';
import getTokensInfo from '../../contracts/abiTokenInfo.js';
import {maker, asset, rates} from '../cell/cell.js';
import chains from '../../configs/chains.json' assert {type: 'json'};
import {getDataTable, brighter} from './interactive.js';

export async function loadTable() {
   const animation = document.querySelector('#animation');
   const ordersSection = document.querySelector('#ordersSection');
   const ordersCount = document.querySelector('#ordersCount');
   const popEmptyBalancesBtn = document.querySelector('#popEmptyBalances');

   animation.innerHTML = loadingHtml();
   ordersSection.textContent = ordersCount.textContent = '';
   popEmptyBalancesBtn.style.display = 'none';
   popEmptyBalancesBtn.innerText = '🏴󠁧󠁢󠁥󠁮󠁧󠁿';

   const {result, chainId} = await ordersApi();
   if (result.error) {
      ordersSection.innerHTML = `${result.statusCode ?? 'No Status code'}: ${result.error}`;
      animation.innerHTML = '';
      return Promise.reject('failed');
   }

   animation.innerHTML = '';
   ordersSection.innerHTML = await ordersTableHtml(result, chainId);
   const ordersDataTable = getDataTable(popEmptyBalancesBtn);
   ordersCount.textContent = `Found: ${result.length}${ordersDataTable.emptyRowsLength ? ` | Empty: ${ordersDataTable.emptyRowsLength}` : ''}`;
   brighter();
   return Promise.resolve('rendered');
}

async function ordersTableHtml(orders, chainId) {
   const chain = chains[chainId];
   const tokensInfo = await getTokensInfo(orders, chain);
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
      const expire = parseInt(expiration(order.data, chainId)) * 1000;
      return `
         <tr>
            ${maker(order.data.maker, order.makerBalance, chain.scanUrl, tokensInfo[order.data.makerAsset])}
            ${await asset(order.data.makerAsset, order.data.makingAmount, chain, tokensInfo[order.data.makerAsset])}
            ${await asset(order.data.takerAsset, order.data.takingAmount, chain, tokensInfo[order.data.takerAsset])}
            ${rates(order, tokensInfo)}
            <td>${getFormattedDateTime(order.createDateTime)}</td>
            <td>${expire ? getFormattedDateTime(expire) : ''}</td>
         </tr>
      `;
   }))).join('')}
      </tbody>
   </table>
   `;
}

async function ordersApi() {
   const fields = {
      makerAsset: getValue('makerAsset'),
      takerAsset: getValue('takerAsset'),
      walletAddress: getValue('walletAddress'),
      chainId: getValue('chainId'),
      statuses: getSelectedValues(document.querySelector('#statuses').options),
      appVersions: getSelectedValues(document.querySelector('#appVersions').options),
   };
   const response = await fetch(getLimitOrdersUrl(fields));
   return {
      result: await response.json(),
      chainId: fields.chainId,
   };
}
