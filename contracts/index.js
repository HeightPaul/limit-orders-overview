/* eslint-disable no-undef */
const ZAPPER_FI_URL = 'https://storage.googleapis.com/zapper-fi-assets/tokens';

async function getTokensInfo(orders, chain){
   const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
   const addresses = getUniqueTokens(orders);
   const nestedTokensInfo = await Promise.all(addresses.map(async(address) => await getTokenAbiInfo(address, provider)));
   return await addImageUrls(addAddressKeys(nestedTokensInfo), chain);
}

async function getTokenAbiInfo(address, provider){
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

async function addImageUrls(tokensInfo, chain){
   for(const tokenAddress in tokensInfo){
      const tokenUrl =`${ZAPPER_FI_URL}/${chain.name}/${tokenAddress}.png`;
      const response = await fetch(tokenUrl);
      tokensInfo[tokenAddress].imageUrl = response.ok ? tokenUrl : `${chain.scanUrl}/images/main/empty-token.png`;
   }
   return tokensInfo;
}

export {getTokensInfo};
