import {ordersTable} from './components/table/orders.js';
import {fillFormBySearchParams, sendPageSearchParamsByForm, clearForm, changeOnAllAddresses} from './components/form/index.js';

document.querySelector('#checkBtn').addEventListener('click', ordersTable);
document.querySelector('#allAddresses').addEventListener('change', changeOnAllAddresses);
document.querySelector('#sendPageSearchParams').addEventListener('click', sendPageSearchParamsByForm);
document.querySelector('#clearForm').addEventListener('click', clearForm);

fillFormBySearchParams();
if(location.search){
   document.querySelector('#checkBtn').click();
}
