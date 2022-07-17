import {getValue} from '../form/fill.js';
import {getStatuses, getLimitOrdersUrl, getLocaleDateTime} from '../../configs/index.js';
import {getTokensInfo} from '../../contracts/index.js';
import {maker, asset, rates} from '../cell/index.js';

const EMPTY_STRING_JOIN = '';

export async function ordersTable(){
   const ordersElement = document.querySelector('#orders');
   const ordersCountElement = document.querySelector('#ordersCount');
   ordersElement.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
   ordersCountElement.textContent = '';

   const fields = {
      makerAsset: getValue('makerAsset'),
      takerAsset: getValue('takerAsset'),
      walletAddress: getValue('walletAddress'),
      chainId: getValue('chainId'),
      statuses: getStatuses(document.querySelector('#statuses').options)
   };
   const response = await fetch(getLimitOrdersUrl(fields));
   const json = await response.json();

   if(json.error){
      ordersElement.innerHTML = `${json.statusCode ?? 'Failed'}: ${json.error}`;
      return Promise.reject('failed');
   }

   const tokensInfo = await getTokensInfo(json, fields.chainId);
   const table = `
    <table class="table table-striped table-dark">
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
            ${maker(order.data.makerAsset, order.makerBalance, order.data.maker, fields.chainId, tokensInfo)}
            ${asset(order.data.makerAsset, order.data.makingAmount, fields.chainId, tokensInfo)}
            ${asset(order.data.takerAsset, order.data.takingAmount, fields.chainId, tokensInfo)}
            ${rates(order)}
            <td>${getLocaleDateTime(order.createDateTime)}</td>
         </tr>
         `).join(EMPTY_STRING_JOIN)}
      </tbody>
    </table>
  `;
   ordersElement.innerHTML = table;
   ordersCountElement.textContent = `Found: ${json.length}`;
   return Promise.resolve('rendered');
}
