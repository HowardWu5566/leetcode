/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  if (s.length % 2) return false

  const map = { '(': 1, '[': 2, '{': 3, ')': 1, ']': 2, '}': 3 }
  const recorder = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      recorder.push(map[s[i]])
    } else if (map[s[i]] !== recorder.pop()) {
      return false
    }
  }
  return !recorder.length
}
