import {changeChainLogo} from '../../configs/chains/chainConfigs'
import {changeOnAllAddresses, clearForm, sendPageSearchParamsByForm} from './form'
import {chooseTokenFromDropdown, searchForTokenAddress} from './search'
import {toggleEmptyBalances} from '../table/rows/rows'
import {loadTable} from '../table/orders'

export default function formEvents(chainIdSelect) {
   document.querySelector('#checkBtn').addEventListener('click', loadTable)
   document.querySelectorAll('[data-input]').forEach(assetInput => {
      assetInput.addEventListener('input', searchForTokenAddress)
      assetInput.addEventListener('click', searchForTokenAddress)
   })
   document.querySelectorAll('[data-dropdownasset]').forEach(assetSelect => {
      assetSelect.addEventListener('click', chooseTokenFromDropdown)
   })
   document.querySelector('#allAddresses').addEventListener('change', changeOnAllAddresses)
   chainIdSelect.addEventListener('change', changeChainLogo)
   document.querySelector('#sendPageSearchParams').addEventListener('click', sendPageSearchParamsByForm)
   document.querySelector('#clearForm').addEventListener('click', clearForm)
   document.querySelector('#clearLocalStorage').addEventListener('click', function() {
      localStorage.clear()
   })
   document.querySelector('#popEmptyBalances').addEventListener('click', toggleEmptyBalances)
}
