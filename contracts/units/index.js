import {formatUnits} from 'ethers';

export function formatToken(input, decimals = 18) {
   return formatUnits(input, decimals);
}
