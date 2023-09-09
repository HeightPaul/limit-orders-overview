function fillInput(urlParams, inputId) {
   const fieldSearch = urlParams.get(inputId)
   if (fieldSearch !== null) {
      document.querySelector(`#${inputId}`).value = fieldSearch
   }
   return fieldSearch
}

function fillSelectedValues(urlParams, inputId) {
   let input = JSON.parse(urlParams.get(inputId))
   if (input) {
      if (!Array.isArray(input)) {
         input = [String(input)]
      }
      const select = document.querySelector(`#${inputId}`)
      Array.from(select.options).forEach(option => {
         option.selected = input.includes(option.value)
      })
   }
}

function setUrlParam(urlParams, inputId) {
   const fieldValue = getValue(inputId)
   if (fieldValue) {
      urlParams.set(inputId, fieldValue)
   }
}

function getValue(inputId) {
   return document.querySelector(`#${inputId}`)?.value
}

export {fillInput, fillSelectedValues, setUrlParam, getValue}
