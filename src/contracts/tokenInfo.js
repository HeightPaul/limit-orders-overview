import {Contract, JsonRpcProvider} from 'ethers'
import {fetchLatestPriceActions, searchCoinIds} from '../utils/coingecko'

export const ERROR_MSG = 'Error!'

export default async function getTokensInfo(orders, chainRpcUrl) {
   try {
      const provider = new JsonRpcProvider(chainRpcUrl)
      const addresses = uniqueTokens(orders)
      const tokens = await Promise.all(addresses.map(async(address) => await convertedFromAbi(address, provider)))
      const priceActions = await fetchLatestPriceActions(await searchCoinIds(tokens))
      return prepareSet(tokens, priceActions)
   } catch (error) {
      alert('Check JsonRpc error in console.')
      throw error
   }
}

function uniqueTokens(orders) {
   const tokenAddressesArray = []
   orders.forEach(order => {
      tokenAddressesArray.push(order.data.makerAsset)
      tokenAddressesArray.push(order.data.takerAsset)
   })
   return Array.from(new Set(tokenAddressesArray))
}

async function convertedFromAbi(address, provider) {
   const tokenAbi = [
      'function symbol() view returns (string)',
      'function name() view returns (string)',
      'function decimals() view returns (uint)'
   ]
   const tokenContract = new Contract(address, tokenAbi, provider)
   let symbol
   try {
      symbol = await tokenContract.symbol()
   } catch (error) {
      console.error(`${address} Symbol: ${error}`)
      symbol = ERROR_MSG
   }

   let name
   try {
      name = await tokenContract.name()
   } catch (error) {
      console.error(`${address} Name: ${error}`)
      name = ERROR_MSG
   }

   let decimals
   try {
      decimals = Number(await tokenContract.decimals())
   } catch (error) {
      console.error(`${address} Decimals: ${error}`)
      decimals = null
   }
   return {
      address: address,
      symbol: symbol,
      name: name,
      decimals: decimals,
   }
}

function prepareSet(tokens, priceActions) {
   const tokensInfo = {}
   for (const token of tokens) {
      const address = token.address
      delete token.address
      tokensInfo[address] = token

      for (const priceAction of priceActions) {
         if (tokensInfo[address].symbol.toLowerCase() == priceAction.symbol) {
            tokensInfo[address].current_price = priceAction.current_price
            tokensInfo[address].price_id = priceAction.id
            tokensInfo[address].price_change_percentage_24h = priceAction.price_change_percentage_24h?.toFixed(2)
            tokensInfo[address].price_change_percentage_30d = priceAction.price_change_percentage_30d_in_currency?.toFixed(2)
            break
         }
      }
   }
   return tokensInfo
}
