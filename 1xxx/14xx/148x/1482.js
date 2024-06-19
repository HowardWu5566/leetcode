/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const minDays = function (bloomDay, m, k) {
  const length = bloomDay.length

  function certainDayBouquets(bloomDay, day, k) {
    let bouquetsMade = 0
    let consecutiveFlowers = 0
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

  let low = Math.min(...bloomDay)
  let high = Math.max(...bloomDay)
  let result = -1

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
