/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = function (s) {
  const mid = (s.length - 1) / 2
  let left = 0

  while (left < mid) {
    let right = mid * 2 - left
    ;[s[left], s[right]] = [s[right], s[left]]
    left++
  }
}

const reverseString2 = function (s) {
  s.reverse()
}
