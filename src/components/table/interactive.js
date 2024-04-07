import {DataTable} from 'simple-datatables'

function getDataTable(popEmptyBalancesBtn) {
   new DataTable('#ordersTable', {
      searchable: true,
      perPage: 100,
      perPageSelect: [100],
      tableRender: setSearchColumns
   })

   const emptyRowsLength = getEmptyRows().length
   if (emptyRowsLength) {
      popEmptyBalancesBtn.style.display = ''
   }

   return {emptyRowsLength: emptyRowsLength}
}

function toggleEmptyBalances() {
   const emptyRows = getEmptyRows()
   if (emptyRows.length) {
      const showEmpty = this.innerText === '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
      this.innerText = showEmpty ? '🏳️' : '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
      emptyRows.forEach(emptyRow => {
         emptyRow.style.display = showEmpty ? '' : 'none'
      })
   }
}

function getEmptyRows() {
   const emptyRows = [];
   [...document.querySelectorAll('.balanceAmount')]
      .filter(amount => Number(amount.innerText) === 0)
      .forEach(amount => {
         const emptyRow = amount.closest('tr')
         emptyRow.style.display = 'none'
         emptyRows.push(emptyRow)
      })
   return emptyRows
}

function setSearchColumns(_data, table, type) {
   if (type === 'print') {
      return table
   }
   const tHead = table.childNodes[0]
   const filterHeaders = {
      nodeName: 'TR',
      childNodes: tHead.childNodes[0].childNodes.map(
         (_th, index) => ({nodeName: 'TH',
            childNodes: [
               {
                  nodeName: 'INPUT',
                  attributes: {
                     class: 'datatable-input',
                     type: 'search',
                     placeholder: 'Search...',
                     'data-columns': `[${index}]`,
                  }
               }
            ]}
         )
      )
   }
   tHead.childNodes.push(filterHeaders)
   return table
}

export {getDataTable, toggleEmptyBalances}
