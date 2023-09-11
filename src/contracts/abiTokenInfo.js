import {Contract, JsonRpcProvider} from 'ethers'

export default async function getTokensInfo(orders, chainRpcUrl) {
   try {
      const provider = new JsonRpcProvider(chainRpcUrl)
      const addresses = uniqueTokens(orders)
      const nestedTokensInfo = await Promise.all(addresses.map(async(address) => await convertedFromAbi(address, provider)))
      return setKeys(nestedTokensInfo)
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
      'function decimals() view returns (uint)'
   ]
   const tokenContract = new Contract(address, tokenAbi, provider)
   let symbol
   try {
      symbol = await tokenContract.symbol()
   } catch (error) {
      console.error(`${address} Symbol: ${error}`)
      symbol = '<Error>'
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
      decimals: decimals
   }
}

function setKeys(nestedTokensInfo) {
   const tokensInfo = {}
   for (const tokensInfoObj of nestedTokensInfo) {
      const address = tokensInfoObj.address
      delete tokensInfoObj.address
      tokensInfo[address] = tokensInfoObj
   }
   return tokensInfo
}
