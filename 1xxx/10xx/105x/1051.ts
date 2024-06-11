function heightChecker(heights: number[]): number {
  const sortedHeights: number[] = [...heights]
  let result: number = 0

  sortedHeights.sort((a, b) => a - b)
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== sortedHeights[i]) result++
  }

  return result
}
