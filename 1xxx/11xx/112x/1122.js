/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
const relativeSortArray = function (arr1, arr2) {
  const hash = new Map()
  const result = []

  for (const item1 of arr1) {
    hash.set(item1, (hash.get(item1) || 0) + 1)
  }

  for (const item2 of arr2) {
    for (let i = 0; i < hash.get(item2); i++) {
      result.push(item2)
    }
    hash.delete(item2)
  }

  const sortedRestKeys = Array.from(hash.keys()).sort((a, b) => a - b)
  for (const restKey of sortedRestKeys) {
    for (let i = 0; i < hash.get(restKey); i++) {
      result.push(restKey)
    }
  }

  return result
}
