function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
): number {
  let result: number = 0

  if (customers.length <= minutes) {
    customers.forEach(customer => (result += customer))
  } else {
    let left: number = 0
    let right: number = minutes

    for (let i = 0; i < customers.length; i++) {
      if (!grumpy[i] || (left <= i && i < right)) {
        result += customers[i]
      }
    }

    let tempResult: number = result

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
