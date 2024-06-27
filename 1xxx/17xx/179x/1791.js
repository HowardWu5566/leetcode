/**
 * @param {number[][]} edges
 * @return {number}
 */
const findCenter = function (edges) {
  const map = new Map()
  for (let edge of edges[0]) {
    map.set(edge, 1)
  }
  for (let edge1 of edges[1]) {
    if (map.has(edge1)) return edge1
  }
}

// another way
const findCenter2 = function (edges) {
  return edges[0][0] === edges[1][0] || edges[0][0] === edges[1][1]
    ? edges[0][0]
    : edges[0][1]
}
