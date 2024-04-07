const ZAPPER_FI_URL = 'https://storage.googleapis.com/zapper-fi-assets/tokens'

export default async function imageUrl(address, chain) {
   const zapperUrl = `${ZAPPER_FI_URL}/${chain.name}/${address}.png`
   const zapperResponse = await fetch(zapperUrl)
   if (zapperResponse.ok) {
      return {url: zapperUrl, isFilled: true}
   }

   return {url: `${ZAPPER_FI_URL}/${chain.name}/0x0000000000000000000000000000000000000000.png`, isFilled: false}
}
