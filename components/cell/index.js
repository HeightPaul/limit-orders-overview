import {formatToken} from '../../contracts/units/index.js';

function maker(tokenAddress, balance, makerAddress, chain, tokensInfo){
   const configToken = tokensInfo[tokenAddress];
   return `
      <td class="w-25">
         <a target="_blank" href="${chain.scanUrl}/address/${makerAddress}" class="coloredAddress" onload="wazup()">${makerAddress}</a>
         <div>${parseFloat(formatToken(balance, configToken.decimals)).toPrecision(8)} <span class="text-light">${configToken.symbol}</span></div>
      </td>
   `;
}

function asset(tokenAddress, amount, chain, tokensInfo){
   const configToken = tokensInfo[tokenAddress];
   return `
      <td>
         <div class="d-flex flex-wrap">
            <div><img class="tokenIcon m-1" src="${configToken.imageUrl}" alt="CT"/></div>
            <div>
               <div><a target="_blank" href="${chain.scanUrl}/address/${tokenAddress}" class="link-secondary">${configToken.symbol}</a></div>
               <div>${parseFloat(formatToken(amount, configToken.decimals)).toPrecision(8)}</div>
            </div>
         </div>
      </td>
  `;
}

function rates(order){
   return `
      <td>
         <div>
            <div>${parseFloat(order.makerRate).toPrecision(4)}</div>
            <div class="text-secondary">${parseFloat(order.takerRate).toPrecision(4)}</div>
         </div>
      </td>
   `;
}

export {maker, asset, rates};
