function isPalindrome(x: number): boolean {
  if (x < 0) return false
  if (x < 10) return true
  const str: string = String(x)
  const length: number = str.length
  for (let i = 0; i < length / 2; i++) {
    if (str[i] !== str[length - i - 1]) return false
  }
  return true
}
