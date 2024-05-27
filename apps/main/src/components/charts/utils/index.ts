import { format, parseISO } from 'date-fns'

export const getXaxisDate = (dateString: string): string => {
  const date = parseISO(dateString)
  const isCurrentYear = new Date().getFullYear() === date.getFullYear()

  if (isCurrentYear) {
    return format(date, 'MMM dd')
  }
  return format(date, 'MMM dd, yyyy')
}
