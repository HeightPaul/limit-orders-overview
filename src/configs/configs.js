const ONE_INCH_API_DOMAIN = 'https://proxy-app.1inch.io/v2.0/orderbook/'
const V4 = '4.0'

function getSelectedValues(htmlOptions) {
   return Array.from(htmlOptions)
      .filter(option => option.selected)
      .map(option => option.value)
}

async function getLimitOrders(bearerToken, fields) {
   return await fetch(getLimitOrdersUrl(fields), {
      'headers': {
         'authorization': `Bearer ${bearerToken}`
      },
      'referrer': 'https://app.1inch.io/'
   })
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

export {getSelectedValues, getLimitOrders, getFormattedDateTime}
