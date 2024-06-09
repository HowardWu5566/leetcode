/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraysDivByK = function (nums, k) {
  const prefixSumMod = new Map()
  prefixSumMod.set(0, 1)
  let prefixSum = 0
  let result = 0

  for (let num of nums) {
    prefixSum += num
    const remainder = ((prefixSum % k) + k) % k

    if (prefixSumMod.has(remainder)) {
      // Note: 有幾個以 num 結尾的 subarray 符合條件
      result += prefixSumMod.get(remainder)
    }

    prefixSumMod.set(remainder, (prefixSumMod.get(remainder) || 0) + 1)
  }

  return result
}
