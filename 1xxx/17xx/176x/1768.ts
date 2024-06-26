function mergeAlternately(word1: string, word2: string): string {
  const length: number = Math.max(word1.length, word2.length)
  let result = ''
  for (let i = 0; i < length; i++) {
    if (word1[i]) {
      result += word1[i]
    }
    if (word2[i]) {
      result += word2[i]
    }
  }
  return result
}
