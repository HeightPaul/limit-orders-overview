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
export {getEmptyRows, toggleEmptyBalances}
