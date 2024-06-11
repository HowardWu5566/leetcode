function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  const hash: Map<number, number> = new Map()
  const result: number[] = []

  for (const item1 of arr1) {
    hash.set(item1, (hash.get(item1) || 0) + 1)
  }

  for (const item2 of arr2) {
    for (let i = 0; i < (hash.get(item2) as number); i++) {
      result.push(item2)
    }
    hash.delete(item2)
  }

  const sortedRestKeys: number[] = Array.from(hash.keys()).sort((a, b) => a - b)
  for (const restKey of sortedRestKeys) {
    for (let i = 0; i < (hash.get(restKey) as number); i++) {
      result.push(restKey)
    }
  }

  return result
}
