/* eslint-disable no-undef */
import chains from '../configs/chains.json' assert { type: 'json' };

async function getTokensInfo(orders, chainId){
   const rpcUrl = chains[chainId].rpcUrl;
   const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
   const addresses = getUniqueTokens(orders);
   const nestedTokensInfo = await Promise.all(addresses.map(async(address)=> await getTokenInfo(address, provider)));
   return await addImageUrls(addAddressKeys(nestedTokensInfo), chainId);
}

async function getTokenInfo(address, provider){
   const tokenAbi = [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint)'
   ];
   const tokenContract = new ethers.Contract(address, tokenAbi, provider);
   return {
      address: address,
      symbol: await tokenContract.symbol(),
      decimals: Number(await tokenContract.decimals())
   };
}

function getUniqueTokens(orders){
   const tokenAddressesArray = [];
   orders.forEach(order => {
      tokenAddressesArray.push(order.data.makerAsset);
      tokenAddressesArray.push(order.data.takerAsset);
   });
   return Array.from(new Set(tokenAddressesArray));
}

function addAddressKeys(nestedTokensInfo){
   const tokensInfo = {};
   for(const tokensInfoObj of nestedTokensInfo){
      const address = tokensInfoObj.address;
      delete tokensInfoObj.address;
      tokensInfo[address] = tokensInfoObj;
   }
   return tokensInfo;
}

async function addImageUrls(tokensInfo, chainId){
   for(const tokenAddress in tokensInfo){
      const response = await fetch(`https://tokens.1inch.io/${tokenAddress}.png`);
      tokensInfo[tokenAddress].imageUrl = response.ok
         ? `https://tokens.1inch.io/${tokenAddress}.png`
         : `${chains[chainId].scanUrl}/images/main/empty-token.png`;
   }
   return tokensInfo;
}

export {getTokensInfo};
