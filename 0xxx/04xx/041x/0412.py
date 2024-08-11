class Solution:
  def fizzBuzz(self, n: int) -> List[str]:
    result = []
    for num in range(1, n + 1):
      result.append(self.transfer(num))
    return result

  def transfer(self, n: int) -> str:
    if n % 15 == 0:
      return 'FizzBuzz'
    elif n % 3 == 0:
      return 'Fizz'
    elif n % 5 == 0:
      return 'Buzz'
    else:
      return str(n)