function fourSum(nums: number[], target: number): number[][] {
  const result: number[][] = []
  nums.sort((a, b) => a - b)

  if (nums.length < 4) return result

  for (let i = 0; i < nums.length - 3; i++) {
    if (target >= 0 && nums[i] > target) break
    if (i > 0 && nums[i] === nums[i - 1]) continue

    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue

      let left = j + 1
      let right = nums.length - 1

      while (left < right) {
        let sum: number = nums[i] + nums[j] + nums[left] + nums[right]
        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]])
          while (left < right && nums[left] === nums[left + 1]) left++
          left++
          while (left < right && nums[right] === nums[right - 1]) right--
          right--
        } else if (sum > target) {
          right--
        } else {
          left++
        }
      }
    }
  }
  return result
}
