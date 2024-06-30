/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const maxNumEdgesToRemove = function (n, edges) {
  const alice = new UnionFind(n)
  const bob = new UnionFind(n)
  let count = 0 // 至少需要幾條 edge

  for (let [type, u, v] of edges) {
    if (type === 3 && alice.union(u - 1, v - 1) && bob.union(u - 1, v - 1))
      count++
  }
  for (let [type, u, v] of edges) {
    if (type === 1 && alice.union(u - 1, v - 1)) count++
    if (type === 2 && bob.union(u - 1, v - 1)) count++
  }

  if (alice.groups === 1 && bob.groups === 1) return edges.length - count
  return -1
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.groups = n
  }

  // 找根節點
  find(i) {
    if (this.parent[i] !== i) {
      this.parent[i] = this.find(this.parent[i])
    }
    return this.parent[i]
  }

  // 跟節點是否相同，若同代表可遍歷，調整 parent 陣列
  union(i, j) {
    const x = this.find(i)
    const y = this.find(j)
    if (x === y) return false
    this.parent[y] = x
    this.groups--
    return true
  }
}

console.log(
  maxNumEdgesToRemove(4, [
    [3, 1, 2],
    [3, 2, 3],
    [1, 1, 3],
    [1, 2, 4],
    [1, 1, 2],
    [2, 3, 4]
  ])
)
