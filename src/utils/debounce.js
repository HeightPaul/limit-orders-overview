
const SECOND = 1000

export default function debounce(func, delay = SECOND) {
   let timer
   return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
         func.apply(this, args)
      }, delay)
   }
}
