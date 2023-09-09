import {Contract, JsonRpcProvider} from 'ethers'

export default async function getTokensInfo(orders, chain) {
   const provider = new JsonRpcProvider(chain.rpcUrl)
   const addresses = uniqueTokens(orders)
   const nestedTokensInfo = await Promise.all(addresses.map(async(address) => await convertedFromAbi(address, provider)))
   return setKeys(nestedTokensInfo)
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
   return {
      address: address,
      symbol: await tokenContract.symbol(),
      decimals: Number(await tokenContract.decimals())
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
