/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minKBitFlips = function (nums, k) {
  const length = nums.length
  const flippedIndex = new Array(length).fill(0)
  let isFlippedPreviously = 0
  let result = 0

  for (let i = 0; i < length; i++) {
    if (i >= k) {
      isFlippedPreviously ^= flippedIndex[i - k]
    }

    if (isFlippedPreviously === nums[i]) {
      if (i + k > length) return -1

      flippedIndex[i] = 1
      isFlippedPreviously ^= 1
      result++
    }
  }

  return result
}
