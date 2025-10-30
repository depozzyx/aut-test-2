import { useMemo } from 'react'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { apiCampaigns } from '@/api-rest/campaigns'
import { handleRestError } from '@/features/common/error'
import { TCampaignStatus } from '@/features/campaigns/types'
import { TAgent, TLeadList, TRecycleRule } from '@/api-rest/campaigns/types'
import { TSelectOption } from '@peiko/components/inputs/Select/types'
import { TAgentGroup } from '@/api-rest/users/groups.types'

type TReturn = {
  data?: {
    id: number | string | null
    name: string
    status: TCampaignStatus
    assignedAgents: TSelectOption<number>[]
    agentGroups: TSelectOption<number>[]
    leadLists: TSelectOption<number>[]
    holdTime: number
    mode: string
    coefficient: number
    filterLeadStatuses: string[]
    recycleRules: TRecycleRule[]
    workHours: string
  }
  isLoading: boolean
}

export const useGetCampaignById = (id: number): TReturn => {
  const { dispatch } = useRedux()

  const key = useMemo(() => `/campaigns/${id}`, [id])

  const fetcher = (id: number) => {
    if (!id) return null
    return apiCampaigns.getCampaignById(id.toString()).then((res) => res.data)
  }

  const { data, isLoading } = useSWR(key, () => fetcher(id as number), {
    revalidateOnFocus: false,
    onError: (e) => handleRestError({ e, dispatch }),
  })

  const initialFormData = useMemo(() => {
    if (!data?.data) return undefined

    const {
      name,
      status,
      assignedAgents,
      leadLists,
      agentGroups,
      holdTime,
      mode,
      coefficient,
      filterLeadStatuses,
      recycleRules,
      workHours,
    } = data.data

    return {
      id,
      name,
      status,
      assignedAgents: assignedAgents.map((agent: TAgent) => ({
        value: agent?.id,
        label: agent?.username,
      })),
      leadLists: leadLists.map((list: TLeadList) => ({
        value: list?.id,
        label: list?.name,
      })),
      agentGroups: (agentGroups ?? []).map((group: TAgentGroup) => ({
        value: group?.id,
        label: group?.name,
      })),
      holdTime,
      mode,
      coefficient,
      filterLeadStatuses,
      recycleRules,
      workHours,
    }
  }, [data?.data, id])

  return { data: initialFormData, isLoading }
}
