import {DataTable} from 'simple-datatables'
import {setSearchColumns, updateHeadersContent} from './head/head'
import {getEmptyRows} from './rows/rows'

function getDataTable(popEmptyBalancesBtn) {
   new DataTable('#ordersTable', {
      searchable: true,
      perPage: 100,
      perPageSelect: [100, 50],
      tableRender: setSearchColumns,
      columns: [
         {
            select: [4, 5],
            type: 'date',
            format: 'D MMM YYYY,'
         },
         {
            select: [7, 8, 10, 11],
            type: 'number',
         }
      ],
   })

   updateHeadersContent()

   const emptyRowsLength = getEmptyRows().length
   if (emptyRowsLength) {
      popEmptyBalancesBtn.style.display = ''
   }

   return {emptyRowsLength: emptyRowsLength}
}

export {getDataTable}

