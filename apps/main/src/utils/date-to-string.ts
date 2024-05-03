import { format } from 'date-fns'

export function dateToString(date: Date): string {
  const stringDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  return stringDate
}
