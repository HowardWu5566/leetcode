function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return ''
  const length: number = gcd(str1.length, str2.length)
  return str1.substring(0, length)
}

function gcd(num1: number, num2: number) {
  if (num2) return gcd(num2, num1 % num2)
  return num1
}

function gcd2(num1: number, num2: number) {
  for (let i = Math.min(num1, num2); i > 0; i--) {
    if (!(num1 % i) && !(num2 % i)) return i
  }
}
