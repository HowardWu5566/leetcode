function numWaterBottles(numBottles: number, numExchange: number): number {
  let result: number = numBottles

  while (numBottles >= numExchange) {
    const newNumBottles = Math.floor(numBottles / numExchange)
    result += newNumBottles
    numBottles -= (numExchange - 1) * newNumBottles
  }

  return result
}

function numWaterBottles2(numBottles: number, numExchange: number): number {
  if (numBottles < numExchange) return numBottles
  return (
    numExchange + numWaterBottles2(numBottles - numExchange + 1, numExchange)
  )
}
