function minOperations(logs: string[]): number {
  let result: number = 0
  for (let log of logs) {
    if (log === '../') {
      result = Math.max(result - 1, 0)
    } else if (log !== './') {
      result++
    }
  }

  return result
}
