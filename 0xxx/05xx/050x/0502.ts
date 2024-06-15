function findMaximizedCapital(
  k: number,
  w: number,
  profits: number[],
  capital: number[]
): number {
  const { MaxPriorityQueue } = require('@datastructures-js/priority-queue')
  const projects: number[][] = []

  for (let i = 0; i < profits.length; i++) {
    projects.push([capital[i], profits[i]])
  }
  projects.sort((a, b) => a[0] - b[0])

  let queue = new MaxPriorityQueue()
  let index: number = 0

  for (let j = 0; j < k; j++) {
    while (index < profits.length && projects[index][0] <= w) {
      queue.enqueue(projects[index][1])
      index++
    }
    if (queue.isEmpty()) break
    w += queue.dequeue().element
  }

  return w
}
