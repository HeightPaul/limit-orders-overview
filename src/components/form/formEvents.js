import {changeChain} from '../../configs/chains/chainConfigs'
import {changeOnAllAddresses, clearForm, sendPageSearchParamsByForm} from './form'
import {chooseTokenFromDropdown, searchForTokenAddress} from './search'
import {toggleEmptyBalances} from '../table/rows/rows'
import {loadTable} from '../table/orders'
import {clearLocalStorageCoins} from '../../utils/coinfeed'
import configEvents from '../../configs/configEvents'

export default function formEvents(chainIdSelect) {
   document.querySelector('#searchForm').addEventListener('submit', (event) => {
      event.preventDefault()
      loadTable()
   })
   document.querySelectorAll('[data-input]').forEach(assetInput => {
      assetInput.addEventListener('input', searchForTokenAddress)
      assetInput.addEventListener('click', searchForTokenAddress)
   })
   document.querySelectorAll('[data-dropdownasset]').forEach(assetSelect => {
      assetSelect.addEventListener('click', chooseTokenFromDropdown)
   })
   document.querySelector('#allAddresses').addEventListener('change', changeOnAllAddresses)
   chainIdSelect.addEventListener('change', changeChain)
   document.querySelector('#sendPageSearchParams').addEventListener('click', sendPageSearchParamsByForm)
   document.querySelector('#clearForm').addEventListener('click', clearForm)
   document.querySelector('#clearLocalStorage').addEventListener('click', clearLocalStorageCoins)
   document.querySelector('#popEmptyBalances').addEventListener('click', toggleEmptyBalances)
   configEvents()
}
