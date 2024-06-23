function longestSubarray(nums: number[], limit: number): number {
  const increaseDeque: number[] = []
  const decreaseDeque: number[] = []
  let left: number = 0
  let result: number = 0

  for (let right = 0; right < nums.length; right++) {
    while (
      increaseDeque.length &&
      nums[right] < increaseDeque[increaseDeque.length - 1]
    ) {
      increaseDeque.pop()
    }
    increaseDeque.push(nums[right])

    while (
      decreaseDeque.length &&
      nums[right] > decreaseDeque[decreaseDeque.length - 1]
    ) {
      decreaseDeque.pop()
    }
    decreaseDeque.push(nums[right])

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
