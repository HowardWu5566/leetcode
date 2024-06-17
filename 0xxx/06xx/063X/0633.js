/**
 * @param {number} c
 * @return {boolean}
 */
const judgeSquareSum = function (c) {
  const upperLimit = Math.ceil(Math.sqrt(c))
  const recorder = new Map()

  for (let i = 0; i <= upperLimit; i++) {
    if (i ** 2 * 2 === c) return true
    if (recorder.has(i ** 2)) {
      return true
    } else {
      recorder.set(c - i ** 2, 'foo')
    }
  }

  return false
}

// two pointer
const judgeSquareSum2 = function (c) {
  const low = 0
  const high = Math.ceil(Math.sqrt(c))

  while (low <= high) {
    const sqrtSum = low ** 2 + high ** 2
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
