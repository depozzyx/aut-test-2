import { format } from 'date-fns'

export type TGroupedLogs<T> = {
  createdDay: string
  data: T[]
}

export const groupLogsByDate = <T extends { createdAt: string | Date }>(
  data: T[],
): TGroupedLogs<T>[] => {
  const groupedData = data.reduce((acc, obj) => {
    const createdDay = format(new Date(obj.createdAt), 'yyyy-MM-dd')
    const newAcc = { ...acc }

    if (!newAcc[createdDay]) newAcc[createdDay] = { createdDay, data: [] }

    newAcc[createdDay].data.push(obj)

    return newAcc
  }, {} as { [key: string]: TGroupedLogs<T> })

  return Object.values(groupedData)
}
