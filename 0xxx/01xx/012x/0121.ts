function maxProfit(prices: number[]): number {
  if (prices.length === 1) return 0
  let buyDay: number = 0
  let sellDay: number = 1
  let profit: number = 0

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
