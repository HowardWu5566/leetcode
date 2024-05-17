/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const recorder = {}

  for (let i = 0; i < nums.length; i++) {
    if (recorder.hasOwnProperty(target - nums[i])) {
      return [recorder[target - nums[i]], i]
    } else {
      recorder[nums[i]] = i
    }
  }
}
