/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false

  const length = s.length
  const map = new Map()
  const getValue = key => map.get(key)
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
