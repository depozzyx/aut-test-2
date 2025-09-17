import { parseISO, format } from 'date-fns'

export const formatCreatedAt = (
  dateString: string,
  withTime?: boolean,
  timeFormat = 'HH:mm',
): string => {
  try {
    const date = parseISO(dateString)
    const currentFormat = `${withTime ? `dd/MM/yyyy ${timeFormat}` : 'dd/MM/yyyy'}`
    return format(date, currentFormat)
  } catch {
    return ''
  }
}

export const formatDuration = (duration: number): string => {
  if (duration > 0) {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${hours ? `${pad(hours)}:` : ''}${pad(minutes)}:${pad(seconds)}`
  }
  return ''
}

export const formatDelayedUntil = (dateString?: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (date.getTime() - Date.now() > 10 * 1000) {
      const currentFormat = `dd/MM/yyyy HH:mm`
      return format(date, currentFormat)
    }
  } catch {
    //
  }
  return ''
}
