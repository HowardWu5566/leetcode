/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  if (prices.length === 1) return 0
  let buyDay = 0
  let sellDay = 1
  let profit = 0

  while (sellDay < prices.length) {
    if (prices[sellDay] - prices[buyDay] > profit) {
      profit = prices[sellDay] - prices[buyDay]
    } else if (prices[sellDay] < prices[buyDay]) {
      buyDay = sellDay
    }
    sellDay++
  }

  return profit
}
