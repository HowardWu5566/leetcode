/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = function (s) {
  s = s.replace(/[^a-z0-9]/gi, '').toLowerCase()
  const maxIndex = s.length - 1
  for (let i = 0; i <= Math.floor(maxIndex / 2); i++) {
    if (s[i] !== s[maxIndex - i]) return false
  }
  return true
}
