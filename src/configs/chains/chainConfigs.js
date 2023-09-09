import chains from './chainList.json' assert {type: 'json'}

function loadChains() {
   const arrayOptionsHtml = []
   console.log
   for (const [id, chain] of Object.entries(chains)) {
      arrayOptionsHtml.push( `<option value="${id}">${chain.publicName}</option>`)
   }
   return arrayOptionsHtml.join('')
}

function changeChainLogo(event) {
   const id = event.target.value
   if (id) {
      const chain = chains[id]
      const chainImg = document.querySelector('#chainImg')
      chainImg.src = `https://app.1inch.io/assets/images/network-logos/${chain.name}-transparent.svg#${chain.name}`
   }
}

export {loadChains, changeChainLogo}
