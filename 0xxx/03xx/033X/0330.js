/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
const minPatches = function (nums, n) {
  let result = 0
  let formableNum = 0
  let i = 0

  while (formableNum < n) {
    if (i < nums.length && nums[i] <= formableNum + 1) {
      formableNum += nums[i]
      i++
    } else {
      formableNum += formableNum + 1
      result++
    }
  }

  return result
}

/* 
Note

testcase: nums = [1, 2, 5], n = 20

if 在 nums 範圍內  依序檢查新的數 (formableNum + 1) 是否 formable
  新的數 1 (formableNum + 1) 能由 nums[0] 加總而得
  formable 範圍擴張，從原本的 0 擴展為 1 (+= nums[0])
  檢查下一項 (nums[1])

  新的數 2 (formableNum + 1) 能由 nums[1] 加總而得
  formable 範圍擴張，從原本的 1 擴展為 3 (+= nums[1])
    (3 = 1 + 2 必定 formable 不用再檢查)

  新的數 4 (formableNum + 1) 不能由 nums 中任何元素加總而得
    (nums[2] > formableNum + 1，5 > 4)
  必須新增元素，新增 4 (原 formableNum + 1)
    可使 formableNum 從 3 擴展到 7 (formableNum += formableNum + 1)為最多
    有助於達成 "新增最少元素"

  nums[2] (5) 讓 formableNum 擴展到 7 + 5 = 12
  新的數 13 必須新增元素才能加總而得
    新增 13 可使 formableNum 擴展到 12 + 13 = 25

  若 n 更大則以此類推...
*/
