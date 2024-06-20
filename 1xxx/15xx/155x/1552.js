/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
const maxDistance = function (position, m) {
  position.sort((a, b) => a - b)
  const length = position.length

  function canPlace(position, distance, m) {
    let ballNum = 1
    let lastPlaced = position[0]
    for (let i = 1; i < length; i++) {
      if (position[i] - lastPlaced >= distance) {
        ballNum++
        lastPlaced = position[i]
      }
      if (ballNum === m) return true
    }
    return false
  }

  if (m === 2) return position[length - 1] - position[0]
  if (m === length) {
    let result = Infinity
    for (let i = 1; i < length; i++) {
      if (position[i] - position[i - 1] < result) {
        result = position[i] - position[i - 1]
      }
    }
    return result
  }

  let minDistance = 1
  let maxDistance = Math.floor((position[length - 1] - position[0]) / (m - 1))
  let result = 1

  while (minDistance <= maxDistance) {
    const midDistance = Math.floor((maxDistance + minDistance) / 2)
    if (canPlace(position, midDistance, m)) {
      result = midDistance
      minDistance = midDistance + 1
    } else {
      maxDistance = midDistance - 1
    }
  }

  return result
}

/**
 * 1,2,3,4,100
 * 3 => 3
 * 4 => 1
 *
 * 1,33,60,61,88,101,105
 *
 *   60               44
 * 32  28
 * 32  28         40      4
 *
 *
 * 3 =>
 * 4 =>
 * 7 => 1
 * 5 =>
 *  1 28 55 56 83 105
 *
 * 1,2,100,200,201
 *
 */
