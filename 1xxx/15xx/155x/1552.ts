function maxDistance(position: number[], m: number): number {
  position.sort((a, b) => a - b)
  const length: number = position.length

  function canPlace(position, distance, m) {
    let ballNum: number = 1
    let lastPlaced: number = position[0]
    // let
    for (let i = 1; i < length; i++) {
      if (position[i] - lastPlaced >= distance) {
        lastPlaced = position[i]
        ballNum++
      }
      if (ballNum === m) return true
    }
    return false
  }
  if (m === 2) return position[length - 1] - position[0]
  if (m === length) {
    let result: number = Infinity
    for (let i = 1; i < length; i++) {
      if (position[i] - position[0] > result) {
        result = position[i] - position[0]
      }
    }
  }

  let minDistance: number = 1
  let maxDistance: number = Math.floor(
    (position[length - 1] - position[0]) / (m - 1)
  )
  let result: number = 1
  while (minDistance <= maxDistance) {
    const midDistance: number = Math.floor((maxDistance + minDistance) / 2)
    if (canPlace(position, midDistance, m)) {
      result = midDistance
      minDistance = midDistance + 1
    } else {
      maxDistance = midDistance - 1
    }
  }

  return result
}
