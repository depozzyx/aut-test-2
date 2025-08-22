export function generateRandomString(length: number, chars: string): string {
  let result = ''
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const special = '!@#$%^&*()_+{}:"<>?[];'
  let mask = ''

  // Ensure mask is built based on input criteria
  if (chars.includes('a')) mask += lowercase
  if (chars.includes('A')) mask += uppercase
  if (chars.includes('#')) mask += digits
  if (chars.includes('!')) mask += special

  do {
    result = ''

    // Add at least one character from each required set
    if (chars.includes('a'))
      result += lowercase[Math.floor(Math.random() * lowercase.length)]
    if (chars.includes('A'))
      result += uppercase[Math.floor(Math.random() * uppercase.length)]
    if (chars.includes('#')) result += digits[Math.floor(Math.random() * digits.length)]
    if (chars.includes('!')) result += special[Math.floor(Math.random() * special.length)]

    // Fill the remaining characters randomly to meet the minimum length
    for (let i = result.length; i < length; i += 1) {
      result += mask[Math.floor(Math.random() * mask.length)]
    }

    // Shuffle the result to avoid predictable patterns
    result = result
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('')
  } while (result.length < length) // Ensure the string is at least 8 characters long

  return result
}
