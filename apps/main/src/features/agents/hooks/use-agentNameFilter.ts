import { useState, useCallback } from 'react'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { TAgentsReq } from '@/api-rest/agents/types'
import { handleRestError } from '@/features/common/error'
import { TPagination } from '@/types/entities/pagination'
import { setAgentNameFilter } from '@/features/agents/store/agent-analytics'
import { apiUsers } from '../../../api/rest/users'
import { ERoles } from '../../../constants/profile'
import { TUser } from '../../../api/rest/users/types'

type TAgentOption = {
  label: string
  value: number
}

type TReturn = {
  agentsOptions: TAgentOption[]
  pagination: TPagination
  loadMoreAgents: () => void
}

export const useAgentNameFilter = (): TReturn => {
  const { dispatch } = useRedux()
  const [agentsOptions, setAgentsOptions] = useState<TAgentOption[]>([])
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 1,
  })

  const fetcher = (params: TAgentsReq) =>
    apiUsers.getUsersList(ERoles.AGENT, params).then((res) => res.data)

  useSWR(
    ['/agents', pagination.page, pagination.limit],
    () =>
      fetcher({
        page: pagination.page,
        limit: pagination.limit,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const formattedData = data.data.map((agent: TUser) => ({
          label: agent.username,
          value: agent.id,
        }))
        if (formattedData.length > 0 && !agentsOptions.length) {
          dispatch(setAgentNameFilter(formattedData[0].value))
        }
        setAgentsOptions((prev) => [...prev, ...formattedData])
        setPagination(data.pagination)
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  const loadMoreAgents = useCallback(() => {
    const nextPage = pagination.page + 1
    const lastPage = Math.ceil(pagination.total / (pagination.limit ?? 10))
    if (pagination.page < lastPage) {
      setPagination((prev) => ({ ...prev, page: nextPage }))
    }
  }, [pagination])

  return { agentsOptions, pagination, loadMoreAgents }
}
