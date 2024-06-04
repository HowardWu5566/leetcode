/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = function (s) {
  const length = s.length
  const hash = {}
  let result = 0

  for (let i = 0; i < length; i++) {
    if (hash[s[i]]) {
      hash[s[i]]--
      result += 2
    } else {
      hash[s[i]] = 1
    }
  }

  return result === length ? result : result + 1
}
