function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize) return false

  const cardCount: Map<number, number> = new Map()
  for (const card of hand) {
    cardCount.set(card, (cardCount.get(card) as number) + 1 || 1)
  }

  const sortedCards = Array.from(cardCount.keys()).sort((a, b) => a - b)
  for (const card of sortedCards) {
    const count: number | undefined = cardCount.get(card)
    if (count) {
      for (let i = 0; i < groupSize; i++) {
        if (!cardCount.has(card + i)) return false
        if ((cardCount.get(card + i) as number) < count) return false
        cardCount.set(card + i, (cardCount.get(card + i) as number) - count)
      }
    }
  }

  return true
}
