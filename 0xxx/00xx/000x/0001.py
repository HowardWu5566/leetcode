class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
    recorder = {}
    for (i, num) in enumerate(nums):
      if num in recorder:
        return [recorder[num], i]
      else:
        recorder[target - num] = i