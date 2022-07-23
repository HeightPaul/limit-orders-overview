import {loadTable} from './components/table/orders.js';
import {fillFormBySearchParams, sendPageSearchParamsByForm, clearForm, changeOnAllAddresses} from './components/form/index.js';
import {toggleEmptyBalances} from './components/table/interactive.js';

document.querySelector('#checkBtn').addEventListener('click', loadTable);
document.querySelector('#allAddresses').addEventListener('change', changeOnAllAddresses);
document.querySelector('#sendPageSearchParams').addEventListener('click', sendPageSearchParamsByForm);
document.querySelector('#clearForm').addEventListener('click', clearForm);

fillFormBySearchParams();
if(location.search) {
   document.querySelector('#checkBtn').click();
}
document.querySelector('#popEmptyBalances').addEventListener('click', toggleEmptyBalances);
