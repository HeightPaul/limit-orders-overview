import {ERROR_MSG} from '../contracts/tokenInfo'

const COINS_API = 'https://api.coingecko.com/api/v3/coins'
const COINS_STORAGE_KEY = 'coins'

async function searchCoinIds(tokens) {
   const coinIds = []
   try {
      let coins = localStorage.getItem('coins')
      if (!coins) {
         const response = await fetch(`${COINS_API}/list`)
         coins = await response.json()
         localStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(coins))
      } else {
         coins = JSON.parse(coins)
      }

      const searchTokens = tokens.filter(token => token.symbol !== ERROR_MSG)
      for (const searchToken of searchTokens) {
         const matchingCoinsBySymbol = coins.filter(coin => coin.symbol.toLowerCase() === searchToken.symbol.toLowerCase())
         let firstMatchId = matchingCoinsBySymbol[0]?.id
         if (!firstMatchId) continue

         if (matchingCoinsBySymbol.length > 1) {
            const matchingCoinsByName = matchingCoinsBySymbol.filter(coin => coin.name.includes(searchToken.name) || searchToken.name.includes(coin.name))
            firstMatchId = matchingCoinsByName[0]?.id ?? firstMatchId
         }
         coinIds.push(firstMatchId)
      }

      return coinIds
   } catch (error) {
      console.error('Error fetching coins:', error)
      return []
   }
}

async function fetchLatestPriceActions(coinIds) {
   try {
      const response = await fetch(`${COINS_API}/markets?vs_currency=usd&ids=${coinIds.join(',')}&price_change_percentage=30d`)
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Fetch price action:', error)
      return []
   }
}

function clearLocalStorageCoins() {
   localStorage.removeItem(COINS_STORAGE_KEY)
}

export {searchCoinIds, fetchLatestPriceActions, clearLocalStorageCoins}
