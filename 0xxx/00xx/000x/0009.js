/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
  if (x < 0) return false
  if (x < 10) return true
  const str = String(x)
  const length = str.length
  for (let i = 0; i < length / 2; i++) {
    if (str[i] !== str[length - i - 1]) return false
  }
  return true
}
