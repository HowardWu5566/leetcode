function search(nums: number[], target: number): number {
  if (nums.length === 0) return -1
  let min: number = -1
  let max: number = nums.length
  while (max - min > 1) {
    if (nums[Math.floor((min + max) / 2)] > target) {
      max = Math.floor((min + max) / 2)
    } else if (nums[Math.floor((min + max) / 2)] < target) {
      min = Math.floor((min + max) / 2)
    } else return Math.floor((min + max) / 2)
  }
  return -1
}
