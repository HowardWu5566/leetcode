/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  if (s.length <= 1) return s.length
  const set = new Set([])
  let result = 0
  let left = 0
  let right = 0

  while (right < s.length) {
    if (!set.has(s[right])) {
      set.add(s[right])
      right++
      if (set.size > result) {
        result = set.size
      }
    } else {
      set.delete(s[left])
      left++
    }
  }

  return result
}
