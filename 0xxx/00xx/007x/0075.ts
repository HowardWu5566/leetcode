/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  nums.sort((a, b) => a - b)
}

function sortColors2(nums: number[]): void {
  const hash: Map<number, number> = new Map()

  for (const num of nums) {
    hash.set(num, (hash.get(num) || 0) + 1)
  }

  const zeroNum = hash.get(0) || 0
  const oneNum = hash.get(1) || 0

  for (let i = 0; i < nums.length; i++) {
    if (i < zeroNum) {
      nums[i] = 0
    } else if (i < zeroNum + oneNum) {
      nums[i] = 1
    } else {
      nums[i] = 2
    }
  }
}
