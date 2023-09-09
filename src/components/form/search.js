import chains from '../../configs/chains/chainList.json' assert {type: 'json'}
import imageUrl from '../../utils/imageUrl'
import {getValue} from './fill'
import loadingHtml from './loading'

const TOKENS_URL = 'https://tokens.1inch.io/v1.2'

async function searchForTokenAddress() {
   if (this.value) {
      const assetSelect = document.querySelector(`#${this.dataset.input}`)
      assetSelect.classList.add('show')
      assetSelect.innerHTML = loadingHtml()
      const chainId = getValue('chainId')
      const tokens = await (await fetch(`${TOKENS_URL}/${chainId}/search?query=${this.value}`)).json()
      assetSelect.innerHTML = tokens.length ? (await getTokensHtml(tokens, chains[chainId])).join('') : '<div class="ms-2">No results</div>'
   }
}

function chooseFromList(event) {
   if (event.target.tagName === 'A') {
      return
   }
   const li = event.target.closest('li')
   if (li) {
      const chosenAddress = li.querySelector('[data-address]')
      document.querySelector(`#${this.dataset.select}`).value = chosenAddress.innerText
      this.classList.remove('show')
   }
}

async function getTokensHtml(tokens, chain) {
   const length = tokens.length
   return Promise.all(tokens.map(async(token, index) => `
      <li>
         <div class="dropdown-item d-flex flex-wrap">
            <div><img class="tokenIcon m-1 me-2" src="${await imageUrl(token.address, chain)}" alt="CT"/></div>
            <div>
               <div>${token.name} | ${token.symbol}</div>
               <a target="_blank" href="${chain.scanUrl}/address/${token.address}" class="fw-light text-light text-decoration-none" data-address>${token.address}</a>
            </div>
         </div>
      </li>
      ${index !== length - 1 ? '<li><hr class="dropdown-divider"></li>' : ''}
   `))
}

export {searchForTokenAddress, chooseFromList}
