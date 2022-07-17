function getStatuses(htmlOptions) {
   return Array.from(htmlOptions)
      .filter(option => option.selected)
      .map(option => option.value);
}

function getLimitOrdersUrl(fields) {
   const url = `https://limit-orders.1inch.io/v2.0/${fields.chainId}/limit-order/${
      fields.walletAddress
         ? `address/${fields.walletAddress}`
         : 'all'
   }`;

   const params = new URLSearchParams({
      page: 1,
      limit: 100,
      statuses: JSON.stringify(fields.statuses),
      makerAsset: fields.makerAsset,
      takerAsset: fields.takerAsset
   });

   return `${url}?${params}`;
}

function getLocaleDateTime(utcDateTime) {
   const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
   return new Date(utcDateTime).toLocaleDateString(undefined, options);
}

export {getStatuses, getLimitOrdersUrl, getLocaleDateTime};
