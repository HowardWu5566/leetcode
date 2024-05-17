function twoSum(nums: number[], target: number): number[] {
  const recorder: { [key: number]: number } = {}

  for (let i = 0; i < nums.length; i++) {
    if (recorder.hasOwnProperty(target - nums[i])) {
      return [recorder[target - nums[i]], i]
    } else {
      recorder[nums[i]] = i
    }
  }
  return []
}
