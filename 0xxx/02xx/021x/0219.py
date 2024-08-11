class Solution:
  def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
    recorder = {}
    for i, num in enumerate(nums):
      if num in recorder and (i - recorder[num] <= k):
        return True
      else:
        recorder[num] = i
    return False