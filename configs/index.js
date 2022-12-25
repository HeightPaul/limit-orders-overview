function getSelectedValues(htmlOptions) {
   return Array.from(htmlOptions)
      .filter(option => option.selected)
      .map(option => option.value);
}

function getLimitOrdersUrl(fields) {
   const url = `https://limit-orders.1inch.io/v${fields.appVersions}/${fields.chainId}/limit-order/${
      fields.walletAddress
         ? `address/${fields.walletAddress}`
         : 'all'
   }`;

   const params = new URLSearchParams({
      page: 1,
      limit: 100,
      makerAsset: fields.makerAsset,
      takerAsset: fields.takerAsset,
      statuses: JSON.stringify(fields.statuses),
   });

   return `${url}?${params}`;
}

function getFormattedDateTime(utcDateTime) {
   const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
   return new Date(utcDateTime).toLocaleDateString(undefined, options);
}

export {getSelectedValues, getLimitOrdersUrl, getFormattedDateTime};
