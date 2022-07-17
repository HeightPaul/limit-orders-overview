function fillInput(urlParams, inputId){
   const fieldSearch = urlParams.get(inputId);
   if(inputId){
      document.querySelector(`#${inputId}`).value = fieldSearch;
   }
   return fieldSearch;
}

function setUrlParam(urlParams, inputId) {
   const fieldValue = getValue(inputId);
   if(fieldValue) {
      urlParams.set(inputId, fieldValue);
   }
}

function getValue(inputId){
   return document.querySelector(`#${inputId}`)?.value;
}

export {fillInput, setUrlParam, getValue};
