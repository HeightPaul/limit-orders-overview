import chains from '../../configs/chains.json' assert {type: 'json'};
import imageUrl from '../../utils/imageUrl';
import {getValue} from './fill';

const TOKENS_URL = 'https://tokens.1inch.io';

async function searchForTokenAddress() {
   const chainId = getValue('chainId');
   const chain = chains[chainId];
   const tokens = await (await fetch(`${TOKENS_URL}/v1.2/${chainId}/search?query=${this.value}`)).json();
   const makerAssetOptions = document.querySelector('#makerAssetOptions');
   makerAssetOptions.innerHTML = (await Promise.all(tokens.map(async(token) => tokenHtml(token, chain)))).join('');
   makerAssetOptions.classList.add('show');
}

function chooseFromList(event) {
   const li = event.target.closest('li');
   if (li) {
      const address = li.querySelector('div[data-address]');
      document.querySelector('#makerAsset').value = address.innerText;
      document.querySelector('#makerAssetOptions').classList.remove('show');
   }
}

async function tokenHtml(token, chain) {
   return `
   <li>
      <div class="dropdown-item d-flex flex-wrap">
         <div><img class="tokenIcon m-1 me-2" src="${await imageUrl(token.address, chain)}" alt="CT"/></div>
         <div>
            <div>${token.symbol}</div>
            <div class="fw-light" data-address>${token.address}</div>
         </div>
      </div>
   </li>
   `;
}

export {searchForTokenAddress, chooseFromList};
