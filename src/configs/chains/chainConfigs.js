import chains from './chainList.json'

const ETH_INDEX = 0
const CHAIN_LOGO_URL = 'https://app.1inch.io/assets/images/network-logos'

function loadChainIdSelect(chainIdSelect) {
   chainIdSelect.innerHTML = Object.entries(chains)
      .map(([id, chain]) => `<option value="${id}">${chain.publicName}</option>`)
      .join('')
   chainIdSelect.selectedIndex = ETH_INDEX
}

function changeChainLogo(event) {
   loadChainLogo(event.target.value)
}

function loadChainLogo(id) {
   if (id) {
      const chain = chains[id]
      const chainImg = document.querySelector('#chainImg')
      chainImg.src = `${CHAIN_LOGO_URL}/${chain.name}-transparent.svg#${chain.name}`
   }
}

export {loadChainIdSelect, changeChainLogo, loadChainLogo}
