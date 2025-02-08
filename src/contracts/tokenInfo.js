import {Contract, JsonRpcProvider} from 'ethers'
import {fetchLatestPriceActions, searchCoinIds} from '../utils/coinfeed'
import imageUrl from '../utils/imageUrl'
import {searchTokensLabelsApi} from '../components/form/search'

export const ERROR_MSG = 'Error!'

export default async function getTokensInfo(orders, chain, rpcUrl, batchMaxCount) {
   try {
      const provider = new JsonRpcProvider(rpcUrl, chain.id, {batchMaxCount: batchMaxCount})
      const addresses = uniqueTokens(orders)
      const tokens = await Promise.all(addresses.map(async(address) => await convertedFromAbi(address, provider, chain.id)))
      const priceActions = await fetchLatestPriceActions(await searchCoinIds(tokens))
      return await prepareSet(tokens, priceActions, chain.name)
   } catch (error) {
      alert('Check error in console.')
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

async function convertedFromAbi(address, provider, chainId) {
   const tokenAbi = [
      'function symbol() view returns (string)',
      'function name() view returns (string)',
      'function decimals() view returns (uint)'
   ]
   const tokenContract = new Contract(address, tokenAbi, provider)

   let hasError = false
   let symbol
   try {
      symbol = await tokenContract.symbol()
   } catch (error) {
      const apiTokens = await searchTokensLabelsApi(chainId, address)
      hasError = true
      symbol = apiTokens[0]?.symbol ?? ERROR_MSG
   }

   let name
   try {
      name = await tokenContract.name()
   } catch (error) {
      name = ERROR_MSG
   }

   let decimals
   try {
      decimals = Number(await tokenContract.decimals())
   } catch (error) {
      decimals = 'N/A'
   }
   
   return {
      address,
      symbol,
      name,
      decimals,
      hasError
   }
}

async function prepareSet(tokens, priceActions, chainName) {
   const tokensInfo = {}
   for (const token of tokens) {
      const address = token.address
      delete token.address
      tokensInfo[address] = token
      tokensInfo[address].image = await imageUrl(address, chainName)
      for (const priceAction of priceActions) {
         if (tokensInfo[address].symbol.toLowerCase() === priceAction.symbol) {
            Object.assign(tokensInfo[address], {
               price_id: priceAction.id,
               current_price: parseFloat(priceAction.current_price),
               price_change_percentage_24h: priceAction.price_change_percentage_24h?.toFixed(2),
               price_change_percentage_30d: priceAction.price_change_percentage_30d_in_currency?.toFixed(2),
            })
            break
         }
      }
   }
   return tokensInfo
}
