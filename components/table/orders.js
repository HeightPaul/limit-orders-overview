import {getValue} from '../form/fill.js';
import {getStatuses, getLimitOrdersUrl, getLocaleDateTime} from '../../configs/index.js';
import {getTokensInfo} from '../../contracts/index.js';
import {maker, asset, rates} from '../cell/index.js';
import chains from '../../configs/chains.json' assert {type: 'json'};
import {dataTable, brighter} from './interactive.js';

const EMPTY_STRING_JOIN = '';

export async function loadTable() {
   const animation = document.querySelector('#animation');
   const ordersSection = document.querySelector('#ordersSection');
   const ordersCount = document.querySelector('#ordersCount');
   animation.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
   ordersSection.textContent = ordersCount.textContent ='';

   const fields = {
      makerAsset: getValue('makerAsset'),
      takerAsset: getValue('takerAsset'),
      walletAddress: getValue('walletAddress'),
      chainId: getValue('chainId'),
      statuses: getStatuses(document.querySelector('#statuses').options)
   };
   const response = await fetch(getLimitOrdersUrl(fields));
   const json = await response.json();

   if(json.error) {
      ordersSection.innerHTML = `${json.statusCode ?? 'Failed'}: ${json.error}`;
      animation.innerHTML = '';
      return Promise.reject('failed');
   }

   const chain = chains[fields.chainId];
   const tokensInfo = await getTokensInfo(json, chain);
   const table = `
      <table class="table table-striped table-dark" id="ordersTable">
         <thead class="thead-dark">
            <tr>
               <th scope="col">Address|Balance</th>
               <th scope="col">Sell</th>
               <th scope="col">Buy</span></th>
               <th scope="col">Order Rates</th>
               <th scope="col">Created</th>
            </tr>
         </thead>
         <tbody>
         ${json.map(order=> `
         <tr>
            ${maker(order.data.makerAsset, order.makerBalance, order.data.maker, chain, tokensInfo)}
            ${asset(order.data.makerAsset, order.data.makingAmount, chain, tokensInfo)}
            ${asset(order.data.takerAsset, order.data.takingAmount, chain, tokensInfo)}
            ${rates(order)}
            <td>${getLocaleDateTime(order.createDateTime)}</td>
         </tr>
         `).join(EMPTY_STRING_JOIN)}
      </tbody>
    </table>
  `;

   ordersSection.innerHTML = table;
   ordersCount.textContent = `Found: ${json.length}`;
   animation.innerHTML = '';
   dataTable();
   brighter();
   return Promise.resolve('rendered');
}
