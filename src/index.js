import {loadTable} from './components/table/orders.js'
import {fillFormBySearchParams, sendPageSearchParamsByForm, clearForm, changeOnAllAddresses} from './components/form/form.js'
import {toggleEmptyBalances} from './components/table/interactive.js'
import {searchForTokenAddress, chooseTokenFromDropdown} from './components/form/search.js'
import {dropdownHandlers} from './components/table/wallets.js'
import {loadChainIdSelect,  changeChainLogo, loadChainLogo} from './configs/chains/chainConfigs.js'

// Event Listeners
const checkBtn = document.querySelector('#checkBtn')
checkBtn.addEventListener('click', loadTable)
document.querySelectorAll('[data-input]').forEach(assetInput => {
   assetInput.addEventListener('input', searchForTokenAddress)
   assetInput.addEventListener('click', searchForTokenAddress)
})
document.querySelectorAll('[data-dropdownasset]').forEach(assetSelect => {
   assetSelect.addEventListener('click', chooseTokenFromDropdown)
})
document.querySelector('#allAddresses').addEventListener('change', changeOnAllAddresses)
const chainIdSelect = document.querySelector('#chainId')
chainIdSelect.addEventListener('change', changeChainLogo)
document.querySelector('#sendPageSearchParams').addEventListener('click', sendPageSearchParamsByForm)
document.querySelector('#clearForm').addEventListener('click', clearForm)
document.querySelector('#clearLocalStorage').addEventListener('click', function() {
   localStorage.clear()
})
document.querySelector('#popEmptyBalances').addEventListener('click', toggleEmptyBalances)
document.querySelector('#ordersSection').addEventListener('click', dropdownHandlers)

// Fillers
loadChainIdSelect(chainIdSelect)
fillFormBySearchParams()
checkBtn.click()
if (location.search) {
   loadChainLogo(chainIdSelect.value)
}
