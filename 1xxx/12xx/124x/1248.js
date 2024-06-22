/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const numberOfSubarrays = function (nums, k) {
  let result = 0
  let oddNumberAmount = 0
  let recorder = [1] // 每2個奇數之間夾著多少偶數 再加1方便後續使用

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2) {
      oddNumberAmount++
      recorder[oddNumberAmount] = 1
    } else {
      recorder[oddNumberAmount]++
    }
  }

  if (oddNumberAmount < k) return result

  for (let j = 0; j <= oddNumberAmount - k; j++) {
    result += recorder[j] * recorder[j + k]
  }

  return result
}
