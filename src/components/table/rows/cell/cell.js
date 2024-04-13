import {formatToken} from '../../../../contracts/unit'
import getHsl from '../../../../utils/coloring'

const COINGECKO_ICON_URL = 'https://avatars.githubusercontent.com/u/7111837?s=280&v=4'

function maker(maker, balance, chainScanUrl, tokenInfo) {
   return `
      <td>
         ${colorWallet(maker, chainScanUrl, 30)}
         <div>
            <span class="balanceAmount">${parseFloat(parseFloat(formatToken(balance, tokenInfo.decimals)).toFixed(8))}</span>
            <span class="text-light">${tokenInfo.symbol}</span>
         </div>
      </td>
   `
}

function colorWallet(wallet, chainScanUrl, length) {
   return `<a target="_blank" href="${chainScanUrl}/address/${wallet}" class="text-decoration-none fw-light" style="color: ${getHsl(wallet)};">${wallet.slice(0, length)}...</a>`
}

function asset(address, amount, chain, tokenInfo) {
   return `
      <td>
         <div class="d-flex flex-wrap">
            <div><a target="_blank" href="${chain.scanUrl}/address/${address}"><img class="tokenIcon m-1 ${tokenInfo.image.isFilled ? '' : 'grayscale'}" src="${tokenInfo.image.url}" alt="CT"/></a></div>
            <div>
               <div><a target="_blank" href="${chain.scanUrl}/address/${address}" class="text-decoration-none text-light">${tokenInfo.symbol}</a></div>
               <div class="text-secondary">${parseFloat(parseFloat(formatToken(amount, tokenInfo.decimals)).toFixed(8))}</div>
            </div>
         </div>
      </td>
   `
}

function orderRates(order, tokensInfo) {
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

function prices(tokenInfo) {
   return `
      <td>${tokenInfo.current_price ? `
         <span class="text-nowrap">
            <a target="_blank" href="https://www.coingecko.com/en/coins/${tokenInfo.price_id}"><img class="coingeckoIcon" src="${COINGECKO_ICON_URL}"/></a>
            $${parseFloat(tokenInfo.current_price.toFixed(8))}` : ''}
         </span>
      </td>
      <td>${tokenInfo.price_change_percentage_24h ? `${tokenInfo.price_change_percentage_24h}%` : ''}</td>
      <td>${tokenInfo.price_change_percentage_30d ? `${tokenInfo.price_change_percentage_30d}%` : ''}</td>
   `
}

function currentRates(makerTokenInfo, takerTokenInfo) {
   return `
      <td>
         ${makerTokenInfo.current_price && takerTokenInfo.current_price ? `
         <div>
            <div>${(makerTokenInfo.current_price / takerTokenInfo.current_price).toFixed(5)}</div>
            <div class="text-secondary">${(takerTokenInfo.current_price / makerTokenInfo.current_price).toFixed(5)}</div>
         </div>`: ''}
      </td>
   `
}

function updateNumberColors() {
   document.querySelectorAll(`
      #ordersTable tbody tr td:nth-child(8),
      #ordersTable tbody tr td:nth-child(9),
      #ordersTable tbody tr td:nth-child(11),
      #ordersTable tbody tr td:nth-child(12)
   `).forEach(elem => {
      elem.className = elem.innerText.includes('-') ? 'text-danger' : 'text-success'
   })
}

export {maker, colorWallet, asset, orderRates, prices, currentRates, updateNumberColors}
