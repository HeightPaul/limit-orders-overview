const ZAPPER_FI_URL = 'https://storage.googleapis.com/zapper-fi-assets/tokens'

export default async function imageUrl(address, chain) {
   const zapperUrl = `${ZAPPER_FI_URL}/${chain.name}/${address}.png`
   const zapperResponse = await fetch(zapperUrl)
   if (zapperResponse.ok) {
      return zapperUrl
   }

   return `${chain.scanUrl}/images/main/empty-token.png`
}
