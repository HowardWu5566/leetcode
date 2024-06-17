function judgeSquareSum(c: number): boolean {
  let low: number = 0
  let high: number = Math.ceil(Math.sqrt(c))

  while (low <= high) {
    const sqrtSum: number = low ** 2 + high ** 2
    if (sqrtSum < c) {
      low++
    } else if (sqrtSum > c) {
      high--
    } else {
      return true
    }
  }

  return false
}
