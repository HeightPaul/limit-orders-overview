import {formatToken} from '../../contracts/units/index.js';

function maker(makerWalletAddress, balance, chain, tokenInfo) {
   return `
      <td>
         <a target="_blank" href="${chain.scanUrl}/address/${makerWalletAddress}" class="coloredAddress">${makerWalletAddress.slice(0, 21)}...</a>
         <div>
            <span class="balanceAmount">${parseFloat(formatToken(balance, tokenInfo.decimals)).toPrecision(8)}</span>
            <span class="text-light">${tokenInfo.symbol}</span>
         </div>
      </td>
   `;
}

function asset(tokenAddress, amount, chain, tokenInfo) {
   return `
      <td>
         <div class="d-flex flex-wrap">
            <div><img class="tokenIcon m-1" src="${tokenInfo.imageUrl}" alt="CT"/></div>
            <div>
               <div><a target="_blank" href="${chain.scanUrl}/address/${tokenAddress}" class="link-secondary">${tokenInfo.symbol}</a></div>
               <div>${parseFloat(formatToken(amount, tokenInfo.decimals)).toPrecision(8)}</div>
            </div>
         </div>
      </td>
  `;
}

function rates(order, tokensInfo) {
   const formattedMakerAmount = parseFloat(formatToken(order.data.makingAmount, tokensInfo[order.data.makerAsset].decimals));
   const formattedTakerAmount = parseFloat(formatToken(order.data.takingAmount, tokensInfo[order.data.takerAsset].decimals));
   return `
      <td>
         <div>
            <div>${(formattedTakerAmount / formattedMakerAmount).toFixed(5)}</div>
            <div class="text-secondary">${(formattedMakerAmount / formattedTakerAmount).toFixed(5)}</div>
         </div>
      </td>
   `;
}

export {maker, asset, rates};
