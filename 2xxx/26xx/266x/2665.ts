type Counter = {
  increment: () => number
  decrement: () => number
  reset: () => number
}

function createCounter(init: number): Counter {
  let num: number = init
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