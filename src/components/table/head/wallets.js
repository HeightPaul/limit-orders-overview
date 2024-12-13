import {colorWallet} from '../rows/cell/cell'

function loadWalletDropdown(orders, chainScanUrl) {
   const uniqueWallets = [...new Set(orders.map(order => order.data.maker))]
   const searchColumn = document.querySelector('[data-columns="[0]"]')
   searchColumn.parentElement.classList.add('d-flex')
   searchColumn.insertAdjacentHTML('beforebegin', `
      <input type="button" id="openWalletDropdown" class="btn btn-primary me-3" value="👛" title="Wallets"/>
      <div class="dropend">
         <ul id="walletDropdown" class="dropdown-menu dropdown-menu-dark dataDropdown">
         ${uniqueWallets.map(maker => `
            <li class="ms-1 me-1 d-flex"><span class="ms-1 me-1" data-pin>📌</span>${colorWallet(maker, chainScanUrl, 21)}</li>
            `).join('<li><hr class="dropdown-divider"></li>')}
         </ul>
      </div>
      `
   )
}

function dropdownHandlers(event) {
   const button = event.target.closest('#openWalletDropdown')
   if (button) {
      document.querySelector('#walletDropdown').classList.toggle('show')
      return
   }

   if (event.target.tagName === 'A') {
      return
   }

   const pin = event.target.closest('[data-pin]')
   if (pin) {
      const searchWalletColumn = document.querySelector('[data-columns="[0]"]')
      searchWalletColumn.value = pin.nextElementSibling.innerText
      const simulateInput = new InputEvent('input', {bubbles: true})
      searchWalletColumn.dispatchEvent(simulateInput)
      document.querySelector('#walletDropdown').classList.remove('show')
      return
   }
}

export {loadWalletDropdown, dropdownHandlers}
