function minPatches(nums: number[], n: number): number {
  let result: number = 0
  let formableNum: number = 0
  let i: number = 0

  while (formableNum < n) {
    if (i < nums.length && nums[i] <= formableNum + 1) {
      formableNum += nums[i]
      i++
    } else {
      formableNum += formableNum + 1
      result++
    }
  }

  return result
}
