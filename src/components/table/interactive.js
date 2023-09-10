import {hsl} from 'd3'
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

function getHsl(hexNumber) {
   const numberString = parseInt(hexNumber).toString().substring(2)
   let [hue, saturation, lightness] = Array.from(numberString).map((_, index) => numberString.slice(index * 3, index * 3 + 3))
   hue = adjustForHsl(hue, 0, 360)
   saturation = adjustForHsl(saturation, 40, 100)
   lightness = adjustForHsl(lightness, 45, 100)
   return hsl(hue, saturation / 100, lightness / 100).formatHsl()
}

function adjustForHsl(number, lowerLimit, upperLimit) {
   return number > upperLimit
      ? adjustForHsl(number - (upperLimit - lowerLimit), lowerLimit, upperLimit)
      : number < lowerLimit
         ? adjustForHsl(number + (upperLimit - lowerLimit), lowerLimit, upperLimit)
         : number
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
                     'data-columns': `[${index}]`
                  }
               }
            ]})
      )
   }
   tHead.childNodes.push(filterHeaders)
   return table
}

export {getDataTable, toggleEmptyBalances, getHsl}
