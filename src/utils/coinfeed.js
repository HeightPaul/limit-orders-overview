import {ERROR_MSG} from '../contracts/tokenInfo'

async function searchCoinIds(tokens) {
   const coinIds = []
   try {
      let coins = localStorage.getItem('coins')
      if (!coins) {
         const response = await fetch('https://api.coingecko.com/api/v3/coins/list')
         coins = await response.json()
         localStorage.setItem('coins', JSON.stringify(coins))
      } else {
         coins = JSON.parse(coins)
      }

      const searchTokens = tokens.filter(token => token.symbol !== ERROR_MSG)
      for (const searchToken of searchTokens) {
         const matchingCoins = coins.filter(
            coin => coin.symbol.toLowerCase() === searchToken.symbol.toLowerCase()
            && (coin.name.includes(searchToken.name) || searchToken.name.includes(coin.name))
         )
         if (matchingCoins[0]?.id) {
            coinIds.push(matchingCoins[0].id)
         }
      }

      return coinIds
   } catch (error) {
      console.error('Error fetching coins:', error)
      return []
   }
}

async function fetchLatestPriceActions(coinIds) {
   try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&price_change_percentage=30d`)
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Fetch price action:', error)
      return []
   }
}

export {searchCoinIds, fetchLatestPriceActions}
