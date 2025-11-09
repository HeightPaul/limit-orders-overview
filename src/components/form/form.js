import {fillInput, fillSelectedValues, setUrlParam} from './fill.js'
import {getSelectedValues} from '../../configs/configs.js'

function fillFormBySearchParams() {
   const urlParams = new URLSearchParams(window.location.search)
   fillWalletAddress(urlParams)
   fillInput(urlParams, 'makerAsset')
   fillInput(urlParams, 'takerAsset')
   fillSelectedValues(urlParams, 'chainId')
   fillInput(urlParams, 'rpcUrl')
   fillInput(urlParams, 'maxBatchSize')
   fillSelectedValues(urlParams, 'statuses')
   fillSelectedValues(urlParams, 'appVersions')
}

function fillWalletAddress(urlParams) {
   const walletAddress = fillInput(urlParams, 'walletAddress')
   if (!walletAddress) {
      document.querySelector('#allAddresses').checked = true
      changeOnAllAddresses()
   }
   document.title += ` - ${walletAddress ?? 'All'}`
}

function changeOnAllAddresses() {
   document.querySelector('#allOrdersRequirementStatus').classList.toggle('d-none')
   document.querySelector('#walletAddressGroup').classList.toggle('d-none')
   document.querySelector('#walletAddress').value = ''
}

function sendPageSearchParamsByForm() {
   const urlParams = new URLSearchParams(window.location.search)
   document.querySelectorAll('.form-control').forEach(field => {
      urlParams.delete(field.id)
   })
   setUrlParam(urlParams, 'makerAsset')
   setUrlParam(urlParams, 'takerAsset')
   setUrlParam(urlParams, 'walletAddress')
   setUrlParam(urlParams, 'chainId')
   setUrlParam(urlParams, 'rpcUrl')
   setUrlParam(urlParams, 'maxBatchSize')
   urlParams.set('statuses', JSON.stringify(getSelectedValues(document.querySelector('#statuses').options)))
   urlParams.set('appVersions', JSON.stringify(getSelectedValues(document.querySelector('#appVersions').options)))
   window.history.pushState(null, null, `?${urlParams}`)
}

function clearForm() {
   document.querySelectorAll('.form-control').forEach(field => {
      field.value = ''
   })
   history.pushState({}, document.title, location.pathname)
}

function swapAssets() {
   const makerInput = document.querySelector('#makerAsset')
   const takerInput = document.querySelector('#takerAsset')
   if (makerInput && takerInput) {
      [makerInput.value, takerInput.value] = [takerInput.value, makerInput.value]
   }
}

export {fillFormBySearchParams, changeOnAllAddresses, sendPageSearchParamsByForm, clearForm, swapAssets}
