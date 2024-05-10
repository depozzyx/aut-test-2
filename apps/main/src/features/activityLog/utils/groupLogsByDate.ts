import { TActivityLog } from '@/types/activity-logs'
import { format } from 'date-fns'
import { GroupedLogs } from '../types/activity-log'

export const groupLogsByDate = (data: TActivityLog[]): GroupedLogs[] => {
  const groupedData = data.reduce((acc, obj) => {
    const createdDay = format(new Date(obj.createdAt), 'yyyy-MM-dd')
    const newAcc = { ...acc }

    if (!newAcc[createdDay]) newAcc[createdDay] = { createdDay, data: [] }

    newAcc[createdDay].data.push(obj)

    return newAcc
  }, {} as { [key: string]: GroupedLogs })

  return Object.values(groupedData)
}
