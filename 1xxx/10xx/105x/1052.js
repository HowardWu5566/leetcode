/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
const maxSatisfied = function (customers, grumpy, minutes) {
  let result = 0

  if (customers.length <= minutes) {
    customers.forEach(customer => (result += customer))
  } else {
    let left = 0
    let right = minutes

    for (let i = 0; i < customers.length; i++) {
      if (!grumpy[i] || (left <= i && i < right)) {
        result += customers[i]
      }
    }

    let tempResult = result

    while (right < customers.length) {
      tempResult = grumpy[left] ? tempResult - customers[left] : tempResult
      tempResult = grumpy[right] ? tempResult + customers[right] : tempResult

      result = tempResult > result ? tempResult : result

      left++
      right++
    }
  }

  return result
}

/*
    [9,10,4,5]

    [1,0,1,1]

    1
 */
