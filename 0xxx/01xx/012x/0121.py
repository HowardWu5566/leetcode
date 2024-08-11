class Solution:
  def maxProfit(self, prices: List[int]) -> int:
    buyDay = 0
    sellDay = 1
    profit = 0

    while sellDay < len(prices):
      if prices[sellDay] - prices[buyDay] > profit:
        profit = prices[sellDay] - prices[buyDay]
      elif prices[sellDay] < prices[buyDay]:
        buyDay = sellDay
      sellDay += 1

    return profit
    