function getAncestors(n: number, edges: number[][]): number[][] {
  const result: number[][] = []
  const children: number[][] = Array.from({ length: n }, () => [])
  const parentNum: number[] = new Array(n).fill(0)
  const ancestors: Set<number>[] = Array.from({ length: n }, () => new Set())
  const queue: number[] = []

  for (let edge of edges) {
    children[edge[0]].push(edge[1])
    parentNum[edge[1]]++
  }

  for (let i = 0; i < n; i++) {
    if (!parentNum[i]) {
      queue.push(i)
    }
  }

  while (queue.length) {
    const node: number = queue.shift() as number
    for (let child of children[node]) {
      ancestors[child].add(node)
      for (let ancestor of ancestors[node]) {
        ancestors[child].add(ancestor)
      }
      parentNum[child]--

      if (parentNum[child] === 0) {
        queue.push(child)
      }
    }
  }

  for (let i = 0; i < n; i++) {
    result[i] = Array.from(ancestors[i]).sort((a, b) => a - b)
  }

  return result
}

getAncestors(6, [
  [0, 3],
  [5, 0],
  [2, 3],
  [4, 3],
  [5, 3],
  [1, 3],
  [2, 5],
  [0, 1],
  [4, 5],
  [4, 2],
  [4, 0],
  [2, 1],
  [5, 1]
])
