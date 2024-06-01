/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const gcdOfStrings = function (str1, str2) {
  if (str1 + str2 !== str2 + str1) return ''
  const length = gcd(str1.length, str2.length)
  return str1.substring(0, length)
}

const gcd = function (num1, num2) {
  if (num2) return gcd(num2, num1 % num2)
  return num1
}

const gcd2 = function (num1, num2) {
  for (let i = Math.min(num1, num2); i > 0; i--) {
    if (!(num1 % i) && !(num2 % i)) return i
  }
}
