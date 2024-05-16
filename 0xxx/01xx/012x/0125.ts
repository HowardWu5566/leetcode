function isPalindrome(s: string): boolean {
  s = s.replace(/[^a-z0-9]/gi, '').toLowerCase()
  const maxIndex: number = s.length - 1
  for (let i: number = 0; i <= Math.floor(maxIndex / 2); i++) {
    if (s[i] !== s[maxIndex - i]) return false
  }
  return true
}
