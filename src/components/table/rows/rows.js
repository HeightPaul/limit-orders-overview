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

function toggleEmptyBalances(event) {
   const emptyRows = getEmptyRows()
   if (emptyRows.length) {
      const showEmpty = getShowEmpty(event.srcElement)
      this.innerText = showEmpty ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿':  '🏳️'
      this.title = showEmpty ? 'Show empty wallet balances!': 'Hide empty wallet balances!'
      updateShowingEmptyBalances(emptyRows, !showEmpty)
   }
}

function getShowEmpty(input) {
   return input.innerText === '🏳️'
}

function updateShowingEmptyBalances(emptyRows, showEmpty) {
   emptyRows.forEach(emptyRow => {
      emptyRow.style.display = showEmpty ? '' : 'none'
   })
}

export {getEmptyRows, toggleEmptyBalances, getShowEmpty, updateShowingEmptyBalances}
