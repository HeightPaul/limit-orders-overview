
import {LimitOrderDecoder, LimitOrderPredicateDecoder} from '@1inch/limit-order-protocol-utils';

function expiration(orderData, chainId) {
   let predicate = orderData.predicate;
   if (!predicate && orderData.offsets && orderData.interactions) {
      const unpacked = LimitOrderDecoder.unpackInteractions(orderData.offsets, orderData.interactions);
      predicate = unpacked.predicate;
   }
   if (predicate) {
      return extract(predicate, chainId);
   }
   console.warn('Data predicate variants missing');
   return null;
}

function extract(predicate, chainId) {
   const limitOrderPredicateDecoder = new LimitOrderPredicateDecoder(chainId);
   const ast = limitOrderPredicateDecoder.decode(predicate);
   const node = limitOrderPredicateDecoder.findFirstDFS(ast, matcher);
   if (node) {
      return node?.args?.timestamp?.bytes;
   }
   console.warn('No nonce predicate found in order.');
   return null;
}

const matcher = (node) => {
   if (
      node.type === 'function'
       && 'name' in node
       && ['timestampBelow', 'timestampBelowAndNonceEquals'].includes(node.name)
   ) return true;

   return false;
};

export default expiration;
