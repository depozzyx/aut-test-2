import { activityLogApi } from '@/api-rest/activity-logs'
import { TActivityLogsReq } from '@/api-rest/activity-logs/types'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { TPagination } from '@/types/entities/pagination'
import { useEffect, useState } from 'react'
import { groupLogsByDate } from '../utils/groupLogsByDate'
import { GroupedLogs } from '../types/activity-log'

export const useActivityLogs = (): {
  getActivityLogsAsync: (params: TActivityLogsReq) => void
  logs: GroupedLogs[]
  pagination: TPagination
  loading: boolean | undefined
} => {
  const { dispatch } = useRedux()
  const [logs, setLogs] = useState<GroupedLogs[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<TPagination>({
    total: 0,
    page: 1,
    limit: 25,
  })

  const getActivityLogsAsync = async (params: TActivityLogsReq) => {
    try {
      setLoading(true)
      const {
        data: { data, pagination },
      } = await activityLogApi.get(params)
      setLogs(groupLogsByDate(data))
      setPagination(pagination)
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getActivityLogsAsync({
      page: pagination.page,
      limit: pagination.limit,
      orderBy: 'ASC',
    })
  }, [])

  return { getActivityLogsAsync, logs, pagination, loading }
}
