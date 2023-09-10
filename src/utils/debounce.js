export default function debounce(func, delay = 1000) {
   let timer
   return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
         func.apply(this, args)
      }, delay)
   }
}
