/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const appendCharacters = function (s, t) {
  let pointerS = 0
  let pointerT = 0

  while (pointerS < s.length) {
    if (s[pointerS] === t[pointerT]) {
      pointerT++
      if (pointerT === t.length) return 0
    }
    pointerS++
  }
  return t.length - pointerT
}
