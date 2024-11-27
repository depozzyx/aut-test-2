import { useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { apiCampaigns } from '@/api-rest/campaigns'
import { selectSelectedCampaignId } from '@/features/campaigns/store/campaigns'
import { handleRestError } from '@/features/common/error'
import { TCampaign } from '@/features/campaigns/types'

export type TAgent = {
  id: number
  name: string
}

export type TLeadList = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  campaign: TCampaign
}

type TReturn = {
  data?: {
    id: number | string | null
    name: string
    assignedAgents: number[]
    leadLists: number[]
    holdTime: number
    mode: string
    coefficient: string
  }
  isLoading: boolean
}

export const useGetCampaignById = (): TReturn => {
  const { select, dispatch } = useRedux()

  const id = select(selectSelectedCampaignId, shallowEqual)

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

    const { name, assignedAgents, leadLists, holdTime, mode, coefficient } = data.data

    return {
      id,
      name,
      assignedAgents: assignedAgents.map((agent: TAgent) => agent?.id),
      leadLists: leadLists.map((list: TLeadList) => list?.id),
      holdTime,
      mode,
      coefficient,
    }
  }, [data?.data, id])

  return { data: initialFormData, isLoading }
}
