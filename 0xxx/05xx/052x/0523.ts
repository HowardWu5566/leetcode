function checkSubarraySum(nums: number[], k: number): boolean {
  if (nums.length < 2) return false

  let sum: number = 0
  const remainderMap: Map<number, number> = new Map()
  remainderMap.set(0, -1)

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    const remainder: number = sum % k
    if (
      remainderMap.has(remainder) &&
      i - (remainderMap.get(remainder) as number) >= 2
    ) {
      return true
    } else if (!remainderMap.has(remainder)) {
      remainderMap.set(remainder, i)
    }
  }

  return false
}
