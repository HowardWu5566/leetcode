/**
 * @param {number[]} nums
 * @return {number}
 */
const minIncrementForUnique = function (nums) {
  let result = 0
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      nums[i]++
      result++
    } else if (nums[i] < nums[i - 1]) {
      const diff = nums[i - 1] - nums[i]
      nums[i] += diff + 1
      result += diff + 1
    }
  }

  return result
}

minIncrementForUnique([3, 2, 1, 2, 1, 7])
