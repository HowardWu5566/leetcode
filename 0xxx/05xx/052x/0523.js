/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const checkSubarraySum = function (nums, k) {
  if (nums.length < 2) return false

  let sum = 0
  const remainderMap = new Map()
  remainderMap.set(0, -1)

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    const remainder = sum % k
    if (remainderMap.has(remainder) && i - remainderMap.get(remainder) >= 2) {
      return true
    } else if (!remainderMap.has(remainder)) {
      remainderMap.set(remainder, i)
    }
  }

  return false
}

// Note: 若餘數相同 其差必可整除
