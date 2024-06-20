/**
 * @param {number} n
 * @return {string[]}
 */
const fizzBuzz = function (n) {
  const result = []

  for (let i = 1; i <= n; i++) {
    let item = ''
    if (!(i % 3)) {
      item += 'Fizz'
    }
    if (!(i % 5)) {
      item += 'Buzz'
    }
    result[i - 1] = item ? item : i.toString()
  }

  return result
}
