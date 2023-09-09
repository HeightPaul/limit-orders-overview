
const ZAPPER_FI_URL = 'https://storage.googleapis.com/zapper-fi-assets/tokens'

export default async function imageUrl(address, chain, logoUri = null) {
   console.log(logoUri)
   if (logoUri !== null) {
      return logoUri
   }
   const tokenUrl =`${ZAPPER_FI_URL}/${chain.name}/${address}.png`
   const response = await fetch(tokenUrl)
   return response.ok ? tokenUrl : `${chain.scanUrl}/images/main/empty-token.png`
}
