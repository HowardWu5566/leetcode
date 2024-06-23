/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
const longestSubarray = function (nums, limit) {
  const increaseDeque = []
  const decreaseDeque = []
  let left = 0
  let result = 0

  for (let right = 0; right < nums.length; right++) {
    // 以 nums[right] 為 increaseDeque 上限 並升序排列
    while (
      increaseDeque.length &&
      nums[right] < increaseDeque[increaseDeque.length - 1]
    ) {
      increaseDeque.pop()
    }
    increaseDeque.push(nums[right])

    // 以 nums[right] 為 decreaseDeque 下限 並降序排列
    while (
      decreaseDeque.length &&
      nums[right] > decreaseDeque[decreaseDeque.length - 1]
    ) {
      decreaseDeque.pop()
    }
    decreaseDeque.push(nums[right])

    // 若超出 limit 更新最大值及最小值
    while (decreaseDeque[0] - increaseDeque[0] > limit) {
      if (nums[left] === increaseDeque[0]) {
        increaseDeque.shift()
      }
      if (nums[left] === decreaseDeque[0]) {
        decreaseDeque.shift()
      }
      left++
    }

    result = Math.max(result, right - left + 1)
  }

  return result
}

//Time Limit Exceeded
/*
const longestSubarray = function (nums, limit) {
  let left = 0
  let right = 0
  let result = 0
  let maxNum = nums[0]
  let minNum = nums[0]

  function updateMaxNum() {
    maxNum = Math.max(...nums.slice(left, right + 1))
  }

  function updateMinNum() {
    minNum = Math.min(...nums.slice(left, right + 1))
  }

  while (right < nums.length) {
    const diff = maxNum - minNum
    if (diff > limit) {
      left++
      if (nums[left - 1] === maxNum) {
        updateMaxNum()
      } else if (nums[left - 1] === minNum) {
        updateMinNum()
      }
    } else {
      do {
        right++
      } while (nums[right] <= maxNum && nums[right] >= minNum)
      if (nums[right] > maxNum) {
        maxNum = nums[right]
      } else if (nums[right] < minNum) {
        minNum = nums[right]
      }
      result = Math.max(right - left, result)
    }
  }

  return result
}
*/
