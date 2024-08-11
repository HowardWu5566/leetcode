class Solution:
  def longestPalindrome(self, s: str) -> int:
    result = 0
    recorder = {}

    for letter in s:
      if recorder.get(letter, 0) == 0:
        recorder[letter] = 1
      else:
        recorder[letter] -= 1
        result += 2

    if len(s) > result:
      result += 1
      
    return result