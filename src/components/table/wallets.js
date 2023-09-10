function loadWalletDropdown(orders) {
   const searchColumn = document.querySelector('[data-columns="[0]"]')
   searchColumn.parentElement.classList.add('d-flex')
   searchColumn.insertAdjacentHTML('beforebegin', `
      <input type="button" id="openWalletDropdown" class="btn btn-primary me-3" value="👛"/>
      <div class="dropend">
         <ul id="walletDropdown" class="dropdown-menu dropdown-menu-dark dataDropdown">
         ${[...new Set(orders.map(order => order.data.maker))].map((maker, index) => `
            <li class="dropdown-item">${maker.slice(0, 21)}...</li>
            ${index !== maker.length - 1 ? '<li><hr class="dropdown-divider"></li>' : ''}
            `).join('')}
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
   const li = event.target.closest('li')
   if (li) {
      const searchColumn = document.querySelector('[data-columns="[0]"]')
      searchColumn.value = li.innerText
      const simulateInput = new InputEvent('input', {bubbles: true})
      searchColumn.dispatchEvent(simulateInput)
      document.querySelector('#walletDropdown').classList.remove('show')
      return
   }
}

export {loadWalletDropdown, dropdownHandlers}
