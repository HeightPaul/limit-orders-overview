const ONE_INCH_API_DOMAIN = 'https://limit-orders.1inch.io'
const V4 = '4.0'

function getSelectedValues(htmlOptions) {
   return Array.from(htmlOptions)
      .filter(option => option.selected)
      .map(option => option.value)
}

function getLimitOrdersUrl(fields) {
   const naming = fields.appVersions.includes(V4) ? '' : '/limit-order'
   const url = `${ONE_INCH_API_DOMAIN}/v${fields.appVersions}/${fields.chainId}${naming}/${
      fields.walletAddress
         ? `address/${fields.walletAddress}`
         : 'all'
   }`

   const params = new URLSearchParams({
      page: 1,
      limit: 100,
      makerAsset: fields.makerAsset,
      takerAsset: fields.takerAsset,
      statuses: fields.appVersions.includes(V4) ? fields.statuses.join(',') : JSON.stringify(fields.statuses),
   })

   return `${url}?${params}`
}

function getFormattedDateTime(utcDateTime) {
   const options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}
   return new Date(utcDateTime).toLocaleDateString('en-GB', options)
}

export {getSelectedValues, getLimitOrdersUrl, getFormattedDateTime}
