/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  const result = []
  nums.sort((a, b) => a - b)

  if (nums.length < 3) return result

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    if (i >= 0 && nums[i] === nums[i - 1]) continue

    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      if (nums[i] + nums[left] + nums[right] === 0) {
        result.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) left++
        left++
        while (left < right && nums[right] === nums[right - 1]) right--
        right--
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        right--
      } else {
        left++
      }
    }
  }
  return result
}
