/**
 * @param {number[]} nums
 * @return {number[]}
 */
const singleNumber = function (nums) {
  const result = []
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) i++
    else {
      result.push(nums[i])
    }
  }

  return result
}

// more efficient
const singleNumber2 = function (nums) {
  let xorAll = 0
  for (let num of nums) {
    xorAll ^= num // 對每個數字做 XOR 得到所求兩數 XOR 的結果
    // [1, 2, 1, 3, 2, 5] 得到 3(0011) ^ 5(0101) = 6(0110)
  }

  let setBit = xorAll & -xorAll // 6(0110) & -6(1010) = 2(0010) => xorAll 最右邊的 1 在第 2 位
  let a = 0
  let b = 0

  for (let num of nums) {
    // 第 2 位為 1 和第 2 位為 0 都恰會出現 1 個只出現 1 次的數字
    if (num & setBit) {
      // 第 2 位為 1
      a ^= num
    } else {
      // 第 2 位為 0
      b ^= num
    }
  }

  return [a, b] // [3, 5]
}
