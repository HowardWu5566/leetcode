class Solution:
  def isValid(self, s: str) -> bool:
    if len(s) % 2 != 0: return False

    bracketMap = {'(': 1, '[': 2, '{': 3, ')': 1, ']': 2, '}': 3}
    recorder = []

    for char in s:
      if char in '([{':
        recorder.append(bracketMap[char])
      elif len(recorder) == 0:
        return False
      elif recorder.pop() != bracketMap[char]:
        return False
    return len(recorder) == 0