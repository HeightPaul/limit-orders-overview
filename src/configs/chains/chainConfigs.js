import chains from './chainList.json'

const ETH_INDEX = 0
const CHAIN_LOGO_URL = 'https://storage.googleapis.com/zapper-fi-assets/networks'

function loadChainIdSelect(chainIdSelect) {
   chainIdSelect.innerHTML = Object.entries(chains)
      .map(([id, chain]) => `<option value="${id}">${chain.publicName}</option>`)
      .join('')
   chainIdSelect.selectedIndex = ETH_INDEX
}

function changeChain(event) {
   loadRpcUrlInput(event.target.value, true)
   loadChainLogo(event.target.value)
}

function loadRpcUrlInput(id, chainUpdate = false) {
   const rpcUrlInput = document.querySelector('#rpcUrl')
   if (chainUpdate) {
      rpcUrlInput.value = chains[id].rpcUrl
      return
   }

   rpcUrlInput.value = rpcUrlInput.value ? rpcUrlInput.value : chains[id].rpcUrl
}

function loadChainLogo(id) {
   const chain = chains[id]
   const chainImg = document.querySelector('#chainImg')
   chainImg.src = `${CHAIN_LOGO_URL}/${chain.name}-icon.png`
}

export {loadChainIdSelect, loadRpcUrlInput, changeChain, loadChainLogo}
