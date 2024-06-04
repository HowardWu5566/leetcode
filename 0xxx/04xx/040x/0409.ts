function longestPalindrome(s: string): number {
  const length = s.length
  const hash: { [key: string]: number } = {}
  let result: number = 0

  for (let i = 0; i < length; i++) {
    if (hash[s[i]]) {
      hash[s[i]]--
      result += 2
    } else {
      hash[s[i]] = 1
    }
  }

  return result === length ? result : result + 1
}
