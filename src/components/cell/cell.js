import {formatToken} from '../../contracts/unit.js'
import getHsl from '../../utils/coloring.js'
import imageUrl from '../../utils/imageUrl.js'

function maker(maker, balance, chainScanUrl, tokenInfo) {
   return `
      <td>
         ${colorWallet(maker, chainScanUrl, 30)}
         <div>
            <span class="balanceAmount">${parseFloat(formatToken(balance, tokenInfo.decimals)).toPrecision(8)}</span>
            <span class="text-light">${tokenInfo.symbol}</span>
         </div>
      </td>
   `
}

function colorWallet(wallet, chainScanUrl, length) {
   return `<a target="_blank" href="${chainScanUrl}/address/${wallet}" class="text-decoration-none fw-light" style="color: ${getHsl(wallet)};">${wallet.slice(0, length)}...</a>`
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

export {maker, colorWallet, asset, rates}
