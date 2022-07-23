/* eslint-disable no-undef */
function dataTable(popEmptyBalancesBtn) {
   new simpleDatatables.DataTable('#ordersTable', {
      searchable: true,
      perPage: 100,
      perPageSelect: [100]
   });

   const emptyRowsLength = getEmptyRows().length;
   if(emptyRowsLength) {
      popEmptyBalancesBtn.style.display = '';
   }

   return {emptyRowsLength: emptyRowsLength};
}

function toggleEmptyBalances() {
   const emptyRows = getEmptyRows();
   if(emptyRows.length) {
      const showEmpty = this.innerText === '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
      this.innerText = showEmpty ? '🏳️' : '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
      emptyRows.forEach(emptyRow => {
         emptyRow.style.display = showEmpty ? '' : 'none';
      });
   }
}

function brighter() {
   document.querySelectorAll('.coloredAddress').forEach(address => {
      address.style.color = d3.color(`#${getSixDigits(address.innerText)}`).brighter(6);
   });
}

function getEmptyRows() {
   let isEmptyAnyBalance = false;
   const emptyRows = [];
   [...document.querySelectorAll('.balanceAmount')]
      .filter(amount => {
         const isEmptyBalance = Number(amount.innerText) === 0;
         if(!isEmptyAnyBalance && isEmptyBalance) {
            isEmptyAnyBalance = true;
         }
         return isEmptyBalance;
      })
      .forEach(amount => {
         const emptyRow = amount.closest('tr');
         emptyRow.style.display = 'none';
         emptyRows.push(emptyRow);
      });
   return emptyRows;
}

function getSixDigits(address) {
   const string = Math.floor(100000 + address * 900000).toString();
   return string.slice(2,8);
}

export{dataTable, toggleEmptyBalances, brighter};
