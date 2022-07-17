import chains from '../../configs/chains.json' assert {type: 'json'};
import {formatToken} from '../../contracts/units/index.js';

function maker(maker, chainId){
   return `<td class="w-25"><a target="_blank" href="${chains[chainId].scanUrl}/address/${maker}" class="link-success">${maker}</a></td>`;
}

function asset(tokenAddress, amount, chainId, tokensInfo) {
   tokenAddress = tokenAddress.toLowerCase();

   const configToken = tokensInfo[tokenAddress];
   return `
      <td>
         <div class="d-flex flex-wrap">
            <div><img class="tokenIcon m-1" src="https://tokens.1inch.io/${tokenAddress}.png" alt="CT"/></div>
            <div>
               <div><a target="_blank" href="${chains[chainId].scanUrl}/address/${tokenAddress}" class="link-success">${configToken?.symbol}</a></div>
               <div>${parseFloat(formatToken(amount, configToken?.decimals)).toPrecision(8)}</div>
            </div>
         </div>
      </td>
  `;
}

function rates(order){
   return `
      <td>
         <div>
            <div>${Number(order.makerRate).toPrecision(4)}</div>
            <div class="text-secondary">${Number(order.takerRate).toPrecision(4)}</div>
         </div>
      </td>
   `;
}

export {maker, asset, rates};
