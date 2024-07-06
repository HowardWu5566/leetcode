/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
const createCounter = function (init) {
  let num = init
  return {
    increment: () => ++num,
    reset: () => {
      num = init
      return num
    },
    decrement: () => --num
  }
}

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */

const counter = createCounter(5)
console.log(counter.increment()) // 6
console.log(counter.increment()) // 6
console.log(counter.increment()) // 6
console.log(counter.increment()) // 6
console.log(counter.increment()) // 6
console.log(counter.increment()) // 6
console.log(counter.decrement()) // 6
console.log(counter.reset()) // 6
