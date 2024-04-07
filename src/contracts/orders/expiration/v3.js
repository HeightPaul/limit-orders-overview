import {LIMIT_ORDER_PROTOCOL_V3_ABI, LimitOrderPredicateDecoder, SERIES_NONCE_MANAGER_ABI} from '@1inch/limit-order-protocol-utils'
import {limitOrderProtocolAddresses} from '@1inch/limit-order-protocol-utils/limit-order-protocol-addresses.const'

export function extractV3(predicate, chainId) {
   const limitOrderPredicateDecoder = new LimitOrderPredicateDecoder(
      limitOrderProtocolAddresses[chainId],
      chainId,
      LIMIT_ORDER_PROTOCOL_V3_ABI,
      SERIES_NONCE_MANAGER_ABI,
   )
   const ast = limitOrderPredicateDecoder.decode(predicate)
   const node = limitOrderPredicateDecoder.findFirstDFS(ast, matcher)
   if (node) {
      return node?.args?.timestamp?.bytes
   }
   console.warn('No nonce predicate found in order.')
   return null
}

const matcher = (node) => {
   if (
      node.type === 'function'
       && 'name' in node
       && ['timestampBelow', 'timestampBelowAndNonceEquals'].includes(node.name)
   ) return true

   return false
}
