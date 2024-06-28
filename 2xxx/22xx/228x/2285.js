/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
const maximumImportance2 = function (n, roads) {
  let result = 0
  const hash = new Map()
  // const

  for (let road of roads) {
    hash.set(road[0], (hash.get(road[0]) || 0) + 1)
    hash.set(road[1], (hash.get(road[1]) || 0) + 1)
  }

  const sorted = Array.from(hash.values()).sort((a, b) => b - a)
  sorted.forEach((value, i) => (result += value * (n - i)))
  return result
}

const maximumImportance = function (n, roads) {
  let result = 0
  const recorder = Array(5).fill(0)

  for (let road of roads) {
    recorder[road[0]]++
    recorder[road[1]]++
  }

  recorder.sort((a, b) => b - a)
  recorder.forEach((value, i) => (result += value * (n - i)))

  return result
}

maximumImportance(5, [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2],
  [1, 3],
  [2, 4]
])
