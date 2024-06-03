function appendCharacters(s: string, t: string): number {
  let pointerS: number = 0
  let pointerT: number = 0

  while (pointerS < s.length) {
    if (s[pointerS] === t[pointerT]) {
      pointerT++
      if (pointerT === t.length) return 0
    }
    pointerS++
  }
  return t.length - pointerT
}
