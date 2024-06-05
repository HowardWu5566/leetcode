function commonChars(words: string[]): string[] {
  let result: string[] = []
  const minFrequency: number[] = new Array(26).fill(Infinity)

  for (let word of words) {
    const frequency: number[] = new Array(26).fill(0)
    for (let letter of word) {
      frequency[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }
    for (let i = 0; i < 26; i++) {
      minFrequency[i] = Math.min(minFrequency[i], frequency[i])
    }
  }

  for (let j = 0; j < 26; j++) {
    result = result.concat(
      Array(minFrequency[j]).fill(String.fromCharCode(j + 'a'.charCodeAt(0)))
    )
  }

  return result
}
