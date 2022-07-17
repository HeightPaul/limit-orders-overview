/* eslint-disable no-undef */
import chains from '../configs/chains.json' assert { type: 'json' };

async function getTokensInfo(orders, chainId){
   const rpcUrl = chains[chainId].rpcUrl;
   const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
   const addresses = getUniqueTokens(orders);

   const tokensInfoObjs = await Promise.all(addresses.map(async(address)=>{
      return {
         [address]: await getTokenInfo(address, provider)
      };
   }));

   return getWithoutParrent(tokensInfoObjs);
}

async function getTokenInfo(tokenAddress, provider){
   const tokenAbi = [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint)'
   ];
   const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
   return {
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

function getWithoutParrent(tokensInfoObjs){
   const tokensInfo = {};
   for(const tokensInfoObj of tokensInfoObjs){
      for(const [address, info] of Object.entries(tokensInfoObj)){
         tokensInfo[address] = info;
      }
   }

   return tokensInfo;
}

export {getTokensInfo};
