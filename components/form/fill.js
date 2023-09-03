function fillInput(urlParams, inputId) {
   const fieldSearch = urlParams.get(inputId);
   if (fieldSearch !== null) {
      document.querySelector(`#${inputId}`).value = fieldSearch;
   }
   return fieldSearch;
}

function fillSelectedValues(urlParams, inputId) {
   const statusesSearch = JSON.parse(urlParams.get(inputId));
   if (statusesSearch) {
      const statusesSelect = document.querySelector(`#${inputId}`);
      Array.from(statusesSelect.options).forEach((option) => {
         option.selected = statusesSearch.includes(option.value);
      });
   }
}

function setUrlParam(urlParams, inputId) {
   const fieldValue = getValue(inputId);
   if (fieldValue) {
      urlParams.set(inputId, fieldValue);
   }
}

function getValue(inputId) {
   return document.querySelector(`#${inputId}`)?.value;
}

export {fillInput, fillSelectedValues, setUrlParam, getValue};
