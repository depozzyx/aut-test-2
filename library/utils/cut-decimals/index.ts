type CutDecimals = (val: string, decimals?: number) => string

export const cutDecimals: CutDecimals = (val, decimals) => {
  if (!decimals) return val

  const value = val.toString()

  if (value === '' || value === '-') return value

  if (!value.includes('.')) {
    return value
  }

  const decLength = value.toString().split('.')[1].length || 0

  return value.substring(0, value.length + decimals - decLength)
}
