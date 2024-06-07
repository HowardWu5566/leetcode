function replaceWords(dictionary: string[], sentence: string): string {
  const words: string[] = sentence.split(' ')
  dictionary.sort((a, b) => a.length - b.length)

  for (let i = 0; i < words.length; i++) {
    for (const root of dictionary) {
      if (words[i].startsWith(root)) {
        words[i] = root
        break
      }
    }
  }

  return words.join(' ')
}
