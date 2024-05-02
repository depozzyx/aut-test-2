import { parseISO, format } from 'date-fns'

export const formatCreatedAt = (dateString: string): string => {
  const date = parseISO(dateString)
  return format(date, 'dd/MM/yyyy')
}
