/**
 * @param {number[]} arr
 * @return {boolean}
 */
const threeConsecutiveOdds = function (arr) {
  let counter = 0
  for (let num of arr) {
    if (num % 2) {
      counter++
      if (counter === 3) return true
    } else {
      counter = 0
    }
  }
  return false
}
