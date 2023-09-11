import {hsl} from 'd3'

export default function getHsl(hexNumber) {
   const numberString = parseInt(hexNumber).toString().substring(2)
   let [hue, saturation, lightness] = Array.from(numberString).map((_, index) => numberString.slice(index * 3, index * 3 + 3))
   hue = adjustForHsl(hue, 0, 360)
   saturation = adjustForHsl(saturation, 40, 100)
   lightness = adjustForHsl(lightness, 45, 100)
   return hsl(hue, saturation / 100, lightness / 100).formatHsl()
}

function adjustForHsl(number, lowerLimit, upperLimit) {
   return number > upperLimit
      ? adjustForHsl(number - (upperLimit - lowerLimit), lowerLimit, upperLimit)
      : number < lowerLimit
         ? adjustForHsl(number + (upperLimit - lowerLimit), lowerLimit, upperLimit)
         : number
}
