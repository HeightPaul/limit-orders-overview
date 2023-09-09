import {formatUnits} from 'ethers';

const DEFAULT_DECIMALS = 18;

export function formatToken(input, decimals = DEFAULT_DECIMALS) {
   return formatUnits(input, decimals);
}
