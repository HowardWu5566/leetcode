/**
 * @param {number} n
 * @param {number} time
 * @return {number}
 */
const passThePillow = function (n, time) {
  if (time >= (n - 1) * 2) {
    time %= (n - 1) * 2
  }
  if (time > n - 1) {
    return n * 2 - time - 1
  } else {
    return 1 + time
  }
}

const passThePillow2 = function (n, time) {
  const chunks = Math.floor(time / (n - 1))
  return chunks % 2 ? n - (time % (n - 1)) : 1 + (time % (n - 1))
}
