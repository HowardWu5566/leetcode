/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
const mergeAlternately = function (word1, word2) {
  const length = word1.length > word2.length ? word1.length : word2.length
  let result = ''
  for (let i = 0; i < length; i++) {
    if (word1[i]) {
      result += word1[i]
    }
    if (word2[i]) {
      result += word2[i]
    }
  }
  return result
}
