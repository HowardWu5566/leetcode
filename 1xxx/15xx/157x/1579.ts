function maxNumEdgesToRemove(n: number, edges: number[][]): number {
  const alice: UnionFind = new UnionFind(n)
  const bob: UnionFind = new UnionFind(n)
  let count = 0

  for (let [type, u, v] of edges) {
    if (type === 3 && alice.union(u - 1, v - 1) && bob.union(u - 1, v - 1)) {
      count++
    }
  }

  for (let [type, u, v] of edges) {
    if (type === 1 && alice.union(u - 1, v - 1)) count++
    if (type === 2 && bob.union(u - 1, v - 1)) count++
  }

  if (alice.groups === 1 && bob.groups === 1) return edges.length - count
  return -1
}

class UnionFind {
  parent: number[]
  groups: number
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.groups = n
  }

  find(i: number): number {
    if (this.parent[i] !== i) {
      this.parent[i] = this.find(this.parent[i])
    }
    return this.parent[i]
  }

  union(i: number, j: number): boolean {
    const x: number = this.find(i)
    const y: number = this.find(j)
    if (x === y) return false
    this.parent[y] = x
    this.groups--
    return true
  }
}
