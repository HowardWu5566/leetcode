/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  nums.sort((a, b) => a - b)
}

const sortColors2 = function (nums) {
  const hash = new Map()

  for (const num of nums) {
    hash.set(num, (hash.get(num) || 0) + 1)
  }

  for (let i = 0; i < nums.length; i++) {
    const zeroNum = hash.get(0) || 0
    const oneNum = hash.get(1) || 0
    if (i < zeroNum) {
      nums[i] = 0
    } else if (i < zeroNum + oneNum) {
      nums[i] = 1
    } else {
      nums[i] = 2
    }
  }
}
