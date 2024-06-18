function maxProfitAssignment(
  difficulty: number[],
  profit: number[],
  worker: number[]
): number {
  const jobs: number[][] = []
  let totalProfit: number = 0

  for (let i = 0; i < profit.length; i++) {
    jobs.push([profit[i], difficulty[i]])
  }
  jobs.sort((a, b) => b[0] - a[0])
  worker.sort((a, b) => b - a)

  let w: number = 0
  let j: number = 0
  while (w < worker.length && j < profit.length) {
    if (worker[w] >= jobs[j][1]) {
      totalProfit += jobs[j][0]
      w++
    } else {
      j++
    }
  }

  return totalProfit
}
