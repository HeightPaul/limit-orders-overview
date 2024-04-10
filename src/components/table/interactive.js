import {DataTable} from 'simple-datatables'

const NO_SEARCH_COLUMN_INDEXES = [3, 6, 7, 8, 9, 10, 11, 12]

function getDataTable(popEmptyBalancesBtn) {
   new DataTable('#ordersTable', {
      searchable: true,
      perPage: 100,
      perPageSelect: [100, 50],
      tableRender: setSearchColumns,
   })

   const noSearchThDivs = document.querySelectorAll('.no-search-th-div')
   noSearchThDivs[0].innerText = 'Order'
   noSearchThDivs[7].innerText = 'Current'

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
                  nodeName: NO_SEARCH_COLUMN_INDEXES.includes(index) ? 'DIV' : 'INPUT',
                  attributes: NO_SEARCH_COLUMN_INDEXES.includes(index) ? {class: 'no-search-th-div px-1 mb-2'} : {
                     class: 'datatable-input',
                     type: 'search',
                     placeholder: 'Search...',
                     'data-columns': `[${index}]`,
                  },
               }
            ]}
         )
      )
   }
   tHead.childNodes.push(filterHeaders)
   return table
}

export {getDataTable, toggleEmptyBalances}
