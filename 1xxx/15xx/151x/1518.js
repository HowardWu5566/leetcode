/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
const numWaterBottles = function (numBottles, numExchange) {
  let result = numBottles

  while (numBottles >= numExchange) {
    const numNewBottles = Math.floor(numBottles / numExchange)
    result += numNewBottles
    numBottles -= (numExchange - 1) * numNewBottles
  }

  return result
}

// recursion
const numWaterBottles2 = function (numBottles, numExchange) {
  if (numBottles < numExchange) return numBottles
  return (
    numExchange + numWaterBottles2(numBottles - numExchange + 1, numExchange)
  )
}
