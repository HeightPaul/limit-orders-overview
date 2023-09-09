import {loadTable} from './components/table/orders.js'
import {fillFormBySearchParams, sendPageSearchParamsByForm, clearForm, changeOnAllAddresses} from './components/form/form.js'
import {toggleEmptyBalances} from './components/table/interactive.js'
import {searchForTokenAddress, chooseFromList} from './components/form/search.js'
import {changeChainLogo, loadChains} from './configs/chains/chainConfigs.js'
import debounce from './utils/debounce.js'

document.querySelector('#checkBtn').addEventListener('click', loadTable)
document.querySelector('#makerAsset').addEventListener('input', debounce(searchForTokenAddress))
document.querySelector('#makerAssetOptions').addEventListener('click', chooseFromList)
document.querySelector('#allAddresses').addEventListener('change', changeOnAllAddresses)
const chainIdSelect = document.querySelector('#chainId')
chainIdSelect.innerHTML = loadChains()
chainIdSelect.addEventListener('change', changeChainLogo)
document.querySelector('#sendPageSearchParams').addEventListener('click', sendPageSearchParamsByForm)
document.querySelector('#clearForm').addEventListener('click', clearForm)

fillFormBySearchParams()
if (location.search) {
   document.querySelector('#checkBtn').click()
}
document.querySelector('#popEmptyBalances').addEventListener('click', toggleEmptyBalances)
