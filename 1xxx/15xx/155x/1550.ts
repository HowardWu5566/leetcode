function threeConsecutiveOdds(arr: number[]): boolean {
  let counter: number = 0
  for (let num of arr) {
    if (num % 2) {
      counter++
      if (counter === 3) return true
    } else {
      counter = 0
    }
  }
  return false
}
