function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false

  const length: number = s.length
  const map: Map<string, number> = new Map()
  const getValue = (key: string): number => map.get(key) || 0
  for (let i = 0; i < length; i++) {
    map.has(s[i]) ? map.set(s[i], getValue(s[i]) + 1) : map.set(s[i], 1)
  }
  for (let j = 0; j < length; j++) {
    if (map.has(t[j]) && getValue(t[j]) > 0) {
      map.set(t[j], getValue(t[j]) - 1)
    } else {
      return false
    }
  }
  return true
}
