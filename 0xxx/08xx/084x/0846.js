/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
const isNStraightHand = function (hand, groupSize) {
  if (hand.length % groupSize) return false

  const cardCount = new Map()
  for (const card of hand) {
    cardCount.set(card, cardCount.get(card) + 1 || 1)
  }

  const sortedCards = Array.from(cardCount.keys()).sort((a, b) => a - b)
  for (const card of sortedCards) {
    const count = cardCount.get(card)
    if (count) {
      for (let i = 0; i < groupSize; i++) {
        if (!cardCount.has(card + i)) return false
        if (cardCount.get(card + i) < count) return false
        cardCount.set(card + i, cardCount.get(card + i) - count)
      }
    }
  }

  return true
}
