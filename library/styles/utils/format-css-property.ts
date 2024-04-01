export const formatCssProperty = (
  value?: string | number,
  unit?: string,
): string | undefined => {
  if (typeof value === 'number') {
    return `${value}${unit || 'px'}`
  }

  return value
}
