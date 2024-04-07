
import {LimitOrderDecoder} from '@1inch/limit-order-protocol-utils'
import {extractV3} from './expiration/v3'

function expiration(orderData, chainId) {
   // 1Inch V2
   let predicate = orderData.predicate
   
   // 1Inch V3
   if (!predicate && orderData.offsets && orderData.interactions) {
      const unpacked = LimitOrderDecoder.unpackInteractionsV3(orderData.offsets, orderData.interactions)
      predicate = unpacked.predicate
   }

   if (predicate) {
      return extractV3(predicate, chainId)
   }
   
   //1Inch V4
   if (orderData.makerTraits) {
      const makerTraits = LimitOrderDecoder.unpackMakerTraits(orderData.makerTraits)
      return makerTraits.expiry
   }

   console.warn('Data predicate variants missing')
   return null
}

export default expiration
