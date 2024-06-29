/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const getAncestors = function (n, edges) {
  const result = new Array(n)
  const children = Array.from({ length: n }, () => []) // 每個數字有哪些 children
  const parentNum = new Array(n).fill(0) // 每個數字有幾個 parents
  const ancestors = Array.from({ length: n }, () => new Set()) // 每個數字有那些 ancestors
  const queue = []

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
    const node = queue.shift() // 正在處理的 node
    for (let child of children[node]) {
      parentNum[child]--
      ancestors[child].add(node) // 記錄 child 的 parent (也就是 node)
      // 如果 node 有 ancestor 也一併加進去
      for (let ancestor of ancestors[node]) {
        ancestors[child].add(ancestor)
      }

      // node 處理完換 child
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
