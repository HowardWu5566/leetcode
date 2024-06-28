function maximumImportance(n: number, roads: number[][]): number {
  let result: number = 0
  const recorder: number[] = new Array(n).fill(0)

  for (let road of roads) {
    recorder[road[0]]++
    recorder[road[1]]++
  }

  recorder.sort((a, b) => b - a)
  recorder.forEach((value, i) => (result += value * (n - i)))

  return result
}
