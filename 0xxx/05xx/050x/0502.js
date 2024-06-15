/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
const findMaximizedCapital = function (k, w, profits, capital) {
  const { MaxPriorityQueue } = require('@datastructures-js/priority-queue')
  const projects = []

  for (let i = 0; i < profits.length; i++) {
    projects.push([capital[i], profits[i]])
  }
  projects.sort((a, b) => a[0] - b[0])

  let queue = new MaxPriorityQueue()
  let index = 0
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
