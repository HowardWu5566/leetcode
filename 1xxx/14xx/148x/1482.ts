function minDays(bloomDay: number[], m: number, k: number): number {
  const length: number = bloomDay.length
  function certainDayBouquets(bloomDay, day, k) {
    let bouquetsMade: number = 0
    let consecutiveFlowers: number = 0
    for (let i = 0; i < length; i++) {
      if (bloomDay[i] <= day) {
        consecutiveFlowers++
      } else {
        bouquetsMade += Math.floor(consecutiveFlowers / k)
        consecutiveFlowers = 0
      }
    }
    bouquetsMade += Math.floor(consecutiveFlowers / k)
    return bouquetsMade
  }

  if (m * k > length) return -1
  if (m * k === length) return Math.max(...bloomDay)

  let low: number = Math.min(...bloomDay)
  let high: number = Math.max(...bloomDay)
  let result: number = -1

  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    const bouquet = certainDayBouquets(bloomDay, mid, k)

    if (bouquet >= m) {
      result = mid
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return result
}
