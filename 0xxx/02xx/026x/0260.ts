function singleNumber(nums: number[]): number[] {
  nums.sort((a, b) => a - b)
  const result: number[] = []

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) i++
    else result.push(nums[i])
  }

  return result
}

function singleNumber2(nums) {
  let xorAll: number = 0
  for (let num of nums) {
    xorAll ^= num
  }

  let setBit: number = xorAll & -xorAll
  let a: number = 0
  let b: number = 0

  for (let num of nums) {
    if (num & setBit) {
      a ^= num
    } else {
      b ^= num
    }
  }

  return [a, b]
}
