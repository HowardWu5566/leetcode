/**
 * @param {string[]} logs
 * @return {number}
 */
const minOperations = function (logs) {
  let result = 0
  for (let log of logs) {
    if (log === '../') {
      result = Math.max(result - 1, 0)
    } else if (log !== './') {
      result++
    }
  }

  return result
}
