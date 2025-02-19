import { format } from 'date-fns'

export const dateToString = (date: Date): string =>
  format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result = ''

  if (hours > 0) {
    result += `${hours}h `
  }
  if (minutes > 0 || hours > 0) {
    result += `${minutes}m `
  }
  result += `${remainingSeconds}s`

  return result.trim()
}
