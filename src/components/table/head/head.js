
const NO_SEARCH_COLUMN_INDEXES = [3, 6, 7, 8, 9, 10, 11, 12]

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

function updateHeadersContent() {
   const noSearchThDivs = document.querySelectorAll('.no-search-th-div')
   noSearchThDivs[0].innerText = 'Order'
   noSearchThDivs[7].innerText = 'Current'
}

export {setSearchColumns, updateHeadersContent}
