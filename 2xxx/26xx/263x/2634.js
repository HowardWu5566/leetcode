/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const filter = function (arr, fn) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!fn(arr[i], i)) {
      arr.splice(i, 1)
    }
  }

  return arr
}
