/* eslint-disable no-undef */
function dataTable() {
   new simpleDatatables.DataTable('#ordersTable', {
      searchable: true,
      perPage: 50,
      perPageSelect: [50, 100]
   });
}

function getSixDigits(address){
   const string = Math.floor(100000 + address * 900000).toString();
   return string.slice(2,8);
}

function brighter() {
   document.querySelectorAll('.coloredAddress').forEach((address) => {
      address.style.color = d3.color(`#${getSixDigits(address.innerText)}`).brighter(6);
   });
}

export{dataTable, brighter};
