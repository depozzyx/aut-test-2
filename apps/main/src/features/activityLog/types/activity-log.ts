import { TActivityLog } from '@/types/activity-logs'

export type GroupedLogs = {
  createdDay: string
  data: TActivityLog[]
}
