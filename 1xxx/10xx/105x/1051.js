/**
 * @param {number[]} heights
 * @return {number}
 */
const heightChecker = function (heights) {
  const sortedHeights = [...heights]
  let result = 0

  sortedHeights.sort((a, b) => a - b)
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== sortedHeights[i]) result++
  }

  return result
}
