import { parseISO, format } from 'date-fns'

export const formatCreatedAt = (dateString: string, withTime?: boolean): string => {
  const date = parseISO(dateString)
  const currentFormat = `${withTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}`
  return format(date, currentFormat)
}
