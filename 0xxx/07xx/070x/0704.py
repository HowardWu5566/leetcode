class Solution:
  def search(self, nums: List[int], target: int) -> int:
    if len(nums) == 0: return -1
    
    min = -1
    max = len(nums)
    while max - min > 1:
      mid = (max + min) // 2
      if nums[mid] > target:
        max = mid
      elif nums[mid] < target:
        min = mid
      else:
        return mid
    return -1