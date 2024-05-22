function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length
  const set: Set<string> = new Set([])
  let result: number = 0
  let right: number = 0
  let left: number = 0

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
