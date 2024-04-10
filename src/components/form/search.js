import chains from '../../configs/chains/chainList.json'
import debounce from '../../utils/debounce'
import imageUrl from '../../utils/imageUrl'
import {getValue} from './fill'
import loadingHtml from './loading'

const TOKENS_URL = 'https://tokens.1inch.io/v1.2'

function searchForTokenAddress(event) {
   const assetSelect = document.querySelector(`#${this.dataset.input}`)
   if (!this.value || (event.type === 'click' && assetSelect.classList.contains('show'))) {
      assetSelect.classList.remove('show')
      return
   }
   assetSelect.classList.add('show')
   assetSelect.innerHTML = loadingHtml()
   debouncedSearch(assetSelect, this.value)
}

const debouncedSearch = debounce(async function(assetSelect, value) {
   const chainId = getValue('chainId')
   const tokens = await (await fetch(`${TOKENS_URL}/${chainId}/search?query=${value}`)).json()
   assetSelect.innerHTML = tokens.length ? await getTokensHtml(tokens, chains[chainId]) : '<div class="ms-2">No results</div>'
})

function chooseTokenFromDropdown(event) {
   if (event.target.tagName === 'A') {
      return
   }
   const li = event.target.closest('li')
   if (li) {
      const chosenAddress = li.querySelector('[data-address]')
      document.querySelector(`#${this.dataset.dropdownasset}`).value = chosenAddress.innerText
      this.classList.remove('show')
   }
}

async function getTokensHtml(tokens, chain) {
   return (await Promise.all(tokens.map(async token => {
      const image = await imageUrl(token.address, chain)
      return `
         <li class="dropdown-item d-flex flex-wrap">
            <div><img class="tokenIcon m-1 me-2 ${image.isFilled ? '' : 'grayscale'}" src="${image.url}" alt="CT"/></div>
            <div>
               <div>${token.name} | ${token.symbol}</div>
               <a target="_blank" href="${chain.scanUrl}/address/${token.address}" class="fw-light text-light text-decoration-none" data-address>${token.address}</a>
            </div>
         </li>
      `
   }))).join('<li><hr class="dropdown-divider"></li>')
}

export {searchForTokenAddress, chooseTokenFromDropdown}
