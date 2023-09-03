import {getValue} from '../form/fill.js';
import {getSelectedValues, getLimitOrdersUrl, getFormattedDateTime} from '../../configs/index.js';
import {getTokensInfo} from '../../contracts/index.js';
import {maker, asset, rates} from '../cell/index.js';
import chains from '../../configs/chains.json' assert {type: 'json'};
import {dataTable, brighter} from './interactive.js';
import loadingHtml from '../form/loading.js';
import expiration from '../../contracts/orders/expiration.js';

export async function loadTable() {
   const animation = document.querySelector('#animation');
   const ordersSection = document.querySelector('#ordersSection');
   const ordersCount = document.querySelector('#ordersCount');
   const popEmptyBalancesBtn = document.querySelector('#popEmptyBalances');

   animation.innerHTML = loadingHtml();
   ordersSection.textContent = ordersCount.textContent = '';
   popEmptyBalancesBtn.style.display = 'none';
   popEmptyBalancesBtn.innerText = '🏴󠁧󠁢󠁥󠁮󠁧󠁿';

   const fields = {
      makerAsset: getValue('makerAsset'),
      takerAsset: getValue('takerAsset'),
      walletAddress: getValue('walletAddress'),
      chainId: getValue('chainId'),
      statuses: getSelectedValues(document.querySelector('#statuses').options),
      appVersions: getSelectedValues(document.querySelector('#appVersions').options),
   };
   const response = await fetch(getLimitOrdersUrl(fields));
   const orders = await response.json();
   if (orders.error) {
      ordersSection.innerHTML = `${orders.statusCode ?? 'No Status code'}: ${orders.error}`;
      animation.innerHTML = '';
      return Promise.reject('failed');
   }
   animation.innerHTML = '';
   ordersSection.innerHTML = await ordersTableHtml(orders, fields.chainId);
   const ordersDataTable = dataTable(popEmptyBalancesBtn);
   ordersCount.textContent = `Found: ${orders.length}${ordersDataTable.emptyRowsLength ? ` | Empty: ${ordersDataTable.emptyRowsLength}` : ''}`;
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
      ${orders.map(order => {
      const expire = parseInt(expiration(order.data, chainId)) * 1000;
      return `
         <tr>
            ${maker(order.data.maker, order.makerBalance, chain.scanUrl, tokensInfo[order.data.makerAsset])}
            ${asset(order.data.makerAsset, order.data.makingAmount, chain.scanUrl, tokensInfo[order.data.makerAsset])}
            ${asset(order.data.takerAsset, order.data.takingAmount, chain.scanUrl, tokensInfo[order.data.takerAsset])}
            ${rates(order, tokensInfo)}
            <td>${getFormattedDateTime(order.createDateTime)}</td>
            <td>${expire ? getFormattedDateTime(expire) : ''}</td>
         </tr>
      `;
   }).join('')}
      </tbody>
   </table>
   `;
}
