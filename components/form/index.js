import {fillInput, fillSelectedValues, setUrlParam} from './fill.js';
import {getSelectedValues} from '../../configs/index.js';

function fillFormBySearchParams() {
   const urlParams = new URLSearchParams(window.location.search);
   fillWalletAddress(urlParams);
   fillInput(urlParams, 'makerAsset');
   fillInput(urlParams, 'takerAsset');
   fillInput(urlParams, 'chainId');
   fillSelectedValues(urlParams, 'statuses');
   fillSelectedValues(urlParams, 'appVersions');
}

function fillWalletAddress(urlParams) {
   const walletAddress = fillInput(urlParams, 'walletAddress');
   if(!walletAddress) {
      document.querySelector('#allAddresses').checked = true;
      changeOnAllAddresses();
   }
   document.title += ` - ${walletAddress ?? 'All'}`;
}

function sendPageSearchParamsByForm() {
   const urlParams = new URLSearchParams(window.location.search);
   document.querySelectorAll('.form-control').forEach(field => {
      urlParams.delete(field.id);
   });
   setUrlParam(urlParams, 'makerAsset');
   setUrlParam(urlParams, 'takerAsset');
   setUrlParam(urlParams, 'chainId');
   setUrlParam(urlParams, 'walletAddress');
   setUrlParam(urlParams, 'chainId');
   urlParams.set('statuses', JSON.stringify(getSelectedValues(document.querySelector('#statuses').options)));
   urlParams.set('appVersions', JSON.stringify(getSelectedValues(document.querySelector('#appVersions').options)));
   window.history.pushState(null, null, `?${urlParams}`);
}

function clearForm() {
   document.querySelectorAll('.form-control').forEach(field => {
      field.value = '';
   });
}

function changeOnAllAddresses() {
   document.querySelector('#walletAddressGroup').classList.toggle('d-none');
   document.querySelector('#walletAddress').value = '';
}

export {fillFormBySearchParams, sendPageSearchParamsByForm, clearForm, changeOnAllAddresses};
