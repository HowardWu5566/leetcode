/**
 * @param {number} n
 * @return {Function} counter
 */
const createCounter = function (n) {
  return () => n++
}

/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
const a = createCounter(10)
a()
a()
a()
