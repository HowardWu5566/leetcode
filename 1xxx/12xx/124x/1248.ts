function numberOfSubarrays(nums: number[], k: number): number {
  let result: number = 0
  let oddNumberAmount: number = 0
  let recorder: number[] = [1]

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2) {
      oddNumberAmount++
      recorder[oddNumberAmount] = 1
    } else {
      recorder[oddNumberAmount]++
    }
  }

  if (oddNumberAmount < k) return result

  for (let j = 0; j <= oddNumberAmount - k; j++) {
    result += recorder[j] * recorder[j + k]
  }

  return result
}
