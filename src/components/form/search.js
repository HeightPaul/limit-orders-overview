import chains from '../../configs/chains.json' assert {type: 'json'}
import imageUrl from '../../utils/imageUrl'
import {getValue} from './fill'

const TOKENS_URL = 'https://tokens.1inch.io'

async function searchForTokenAddress() {
   if (this.value) {
      const chainId = getValue('chainId')
      const tokens = await (await fetch(`${TOKENS_URL}/v1.2/${chainId}/search?query=${this.value}`)).json()
      const makerAssetOptions = document.querySelector('#makerAssetOptions')
      const tokensHtml = await getTokensHtml(tokens, chains[chainId])
      makerAssetOptions.innerHTML = tokensHtml.length ? tokensHtml.join('') : '<div class="ms-2">No results</div>'
      makerAssetOptions.classList.add('show')
   }
}

function chooseFromList(event) {
   if (event.target.tagName === 'A') {
      return
   }
   const li = event.target.closest('li')
   if (li) {
      const chosenAddress = li.querySelector('[data-address]')
      document.querySelector('#makerAsset').value = chosenAddress.innerText
      document.querySelector('#makerAssetOptions').classList.remove('show')
   }
}

async function getTokensHtml(tokens, chain) {
   return Promise.all(tokens.map(async(token) => {
      return `
      <li>
         <div class="dropdown-item d-flex flex-wrap">
            <div><img class="tokenIcon m-1 me-2" src="${await imageUrl(token.address, chain, token.logoUri)}" alt="CT"/></div>
            <div>
               <div>${token.symbol} | ${token.name}</div>
               <a target="_blank" href="${chain.scanUrl}/address/${token.address}" class="fw-light text-dark text-decoration-none" data-address>${token.address}</a>
            </div>
         </div>
      </li>
      `
   }))
}

export {searchForTokenAddress, chooseFromList}
