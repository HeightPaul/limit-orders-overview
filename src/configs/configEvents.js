export default function configEvents() {
   const togglerConfigurationMenus = document.querySelector('#toggleConfigurationMenus')
   togglerConfigurationMenus.addEventListener('click', () => {
      document.querySelectorAll('.configurationMenus')
         .forEach(elem => {
            elem.classList.toggle('d-none')
         })
   })

   const existingToken = localStorage.getItem('1inchToken')
   if (!existingToken) {
      togglerConfigurationMenus.click()
   }

   const tokenInput = document.querySelector('#oneInchToken')
   tokenInput.addEventListener('input', () => {
      const token = tokenInput.value.trim()
      if (token) {
         localStorage.setItem('1inchToken', token)
         return
      }
      localStorage.removeItem('1inchToken')
   })

   tokenInput.addEventListener('blur', () => {
      if (tokenInput.value) {
         tokenInput.type = 'password'
      }
   })

   tokenInput.addEventListener('focus', () => {
      tokenInput.type = 'text'
   })
}
