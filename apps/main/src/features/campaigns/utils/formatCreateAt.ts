import { parseISO, format } from 'date-fns'

export const formatCreatedAt = (dateString: string, withTime?: boolean): string => {
  try {
    const date = parseISO(dateString)
    const currentFormat = `${withTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}`
    return format(date, currentFormat)
  } catch {
    return ''
  }
}

export const formatDelayedUntil = (dateString?: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (date.getTime() - Date.now() > 5 * 60 * 1000) {
      const currentFormat = `dd/MM/yyyy HH:mm`
      return format(date, currentFormat)
    }
  } catch {
    //
  }
  return ''
}
