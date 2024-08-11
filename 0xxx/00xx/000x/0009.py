class Solution:
  def isPalindrome(self, x: int) -> bool:
    if x < 0: return False
    if x < 10: return True

    strX = str(x)
    leng = len(strX)
    for i in range(leng // 2):
      if strX[i] != str[leng - i - 1]: return False
    return True