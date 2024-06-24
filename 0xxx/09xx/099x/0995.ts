function minKBitFlips(nums: number[], k: number): number {
  const length: number = nums.length
  const flippedIndex: number[] = Array(length).fill(0)
  let isFlippedPreviously: number = 0
  let result: number = 0

  for (let i = 0; i < length; i++) {
    if (i >= k) {
      isFlippedPreviously ^= flippedIndex[i - k]
    }

    if (isFlippedPreviously === nums[i]) {
      if (i + k > length) return -1

      flippedIndex[i] = 1
      isFlippedPreviously ^= 1
      result++
    }
  }

  return result
}
