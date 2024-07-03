/**
 * @param {number[]} nums
 * @return {number}
 */
const minDifference = function (nums) {
  if (nums.length <= 4) return 0

  let result = Infinity
  nums.sort((a, b) => a - b)

  const maxIndex = nums.length - 1
  for (let i = 0; i <= 3; i++) {
    result =
      nums[maxIndex - 3 + i] - nums[i] < result
        ? nums[maxIndex - 3 + i] - nums[i]
        : result
  }

  return result
}
