/**
 * @param {number[][]} customers
 * @return {number}
 */
const averageWaitingTime = function (customers) {
  const length = customers.length
  let totalWaitingTime = customers[0][1]
  let nextStartingTime = customers[0][0] + customers[0][1]

  for (let i = 1; i < length; i++) {
    if (customers[i][0] < nextStartingTime) {
      totalWaitingTime += nextStartingTime - customers[i][0]
      nextStartingTime += customers[i][1]
    } else {
      nextStartingTime = customers[i][0] + customers[i][1]
    }
    totalWaitingTime += customers[i][1]
  }

  return totalWaitingTime / length
}
