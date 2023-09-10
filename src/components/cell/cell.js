import {formatToken} from '../../contracts/unit.js'
import imageUrl from '../../utils/imageUrl.js'
import {getHsl} from '../table/interactive.js'

function maker(makerWalletAddress, balance, chainScanUrl, tokenInfo) {
   return `
      <td>
         <a target="_blank" href="${chainScanUrl}/address/${makerWalletAddress}" class="text-decoration-none fw-light" style="color: ${getHsl(makerWalletAddress)};">${makerWalletAddress.slice(0, 21)}...</a>
         <div>
            <span class="balanceAmount">${parseFloat(formatToken(balance, tokenInfo.decimals)).toPrecision(8)}</span>
            <span class="text-light">${tokenInfo.symbol}</span>
         </div>
      </td>
   `
}

async function asset(address, amount, chain, tokenInfo) {
   return `
      <td>
         <div class="d-flex flex-wrap">
            <div><a target="_blank" href="${chain.scanUrl}/address/${address}"><img class="tokenIcon m-1" src="${await imageUrl(address, chain)}" alt="CT"/></a></div>
            <div>
               <div><a target="_blank" href="${chain.scanUrl}/address/${address}" class="text-decoration-none text-light">${tokenInfo.symbol}</a></div>
               <div class="text-secondary">${parseFloat(formatToken(amount, tokenInfo.decimals)).toPrecision(8)}</div>
            </div>
         </div>
      </td>
   `
}

function rates(order, tokensInfo) {
   const formattedMakerAmount = parseFloat(formatToken(order.data.makingAmount, tokensInfo[order.data.makerAsset].decimals))
   const formattedTakerAmount = parseFloat(formatToken(order.data.takingAmount, tokensInfo[order.data.takerAsset].decimals))
   return `
      <td>
         <div>
            <div>${(formattedTakerAmount / formattedMakerAmount).toFixed(5)}</div>
            <div class="text-secondary">${(formattedMakerAmount / formattedTakerAmount).toFixed(5)}</div>
         </div>
      </td>
   `
}

export {maker, asset, rates}
