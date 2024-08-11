class Solution:
  def isAnagram(self, s: str, t: str) -> bool:
    if len(s) != len(t): return False

    recorder = {}
    for ls in s:
      recorder[ls] = recorder.get(ls, 0) + 1
    for lt in t:
      if lt in recorder and recorder[lt] > 0:
        recorder[lt] -= 1
      else:
        return False
    return True