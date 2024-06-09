function subarraysDivByK(nums: number[], k: number): number {
  const prefixSumMod: Map<number, number> = new Map()
  prefixSumMod.set(0, 1)
  let prefixSum: number = 0
  let result: number = 0

  for (let num of nums) {
    prefixSum += num
    const remainder: number = ((prefixSum % k) + k) % k

    if (prefixSumMod.has(remainder)) {
      result += prefixSumMod.get(remainder) as number
    }

    prefixSumMod.set(remainder, (prefixSumMod.get(remainder) || 0) + 1)
  }

  return result
}
