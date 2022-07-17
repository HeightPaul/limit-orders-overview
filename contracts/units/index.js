/* eslint-disable no-undef */
export function formatToken(input, decimals = 18){
   return ethers.utils.formatUnits(input, decimals);
}
