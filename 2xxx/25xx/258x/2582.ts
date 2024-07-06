function passThePillow(n: number, time: number): number {
  if (time >= (n - 1) * 2) {
    time %= (n - 1) * 2
  }
  if (time > n - 1) {
    return n * 2 - time - 1
  } else {
    return 1 + time
  }
}

function passThePillow2(n: number, time: number): number {
  const chunks: number = Math.floor(time / (n - 1))
  return chunks % 2 ? n - (time % (n - 1)) : 1 + (time % (n - 1))
}
