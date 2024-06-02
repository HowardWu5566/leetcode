/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  let left: number = 0
  const mid: number = (s.length - 1) / 2
  while (left < mid) {
    let right: number = mid * 2 - left
    ;[s[left], s[right]] = [s[right], s[left]]
    left++
  }
}

function reverseString2(s: string[]): void {
  s.reverse()
}
