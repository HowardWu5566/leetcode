function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const hash: Map<number, number> = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (hash.has(nums[i]) && i - (hash.get(nums[i]) as number) <= k) {
      return true
    } else {
      hash.set(nums[i], i)
    }
  }
  return false
}
