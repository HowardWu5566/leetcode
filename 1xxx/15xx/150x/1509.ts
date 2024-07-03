function minDifference(nums: number[]): number {
  if (nums.length <= 4) return 0

  let result: number = Infinity
  const maxIndex: number = nums.length - 1
  nums.sort((a, b) => a - b)
  for (let i = 0; i <= 3; i++) {
    result =
      nums[maxIndex - 3 + i] - nums[i] < result
        ? nums[maxIndex - 3 + i] - nums[i]
        : result
  }

  return result
}
