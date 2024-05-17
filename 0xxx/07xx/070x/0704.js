/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  if (nums.length === 0) return -1
  let min = -1
  let max = nums.length

  while (max - min > 1) {
    if (nums[Math.floor((min + max) / 2)] < target) {
      min = Math.floor((min + max) / 2)
    } else if (nums[Math.floor((min + max) / 2)] > target) {
      max = Math.floor((min + max) / 2)
    } else {
      return Math.floor((min + max) / 2)
    }
  }
  return -1
}
