import { useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { apiCampaigns } from '@/api-rest/campaigns'
import { selectSelectedCampaignId } from '@/features/campaigns/store/campaigns'
import { handleRestError } from '@/features/common/error'
import { TGeneratedCallFrequency, TGeneratedCallTime } from '../constants'

export type TAgent = {
  id: number
  name: string
}

export type TLeadList = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

type TReturn = {
  data?: {
    id: number | string | null
    name: string
    intensity: TGeneratedCallFrequency
    intensityPerAgent: TGeneratedCallFrequency
    preferredCallTime: TGeneratedCallTime
    assignedAgents: number[]
    leadLists: number[]
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

  const campaign = data?.data

  const initialFormData = useMemo(() => {
    if (!campaign) return undefined

    const { name, intensity, preferredCallTime, assignedAgents, leadLists } = campaign

    return {
      id,
      name,
      intensity,
      intensityPerAgent: intensity,
      preferredCallTime,
      assignedAgents: assignedAgents.map((agent: TAgent) => agent?.id),
      leadLists: leadLists.map((list: TLeadList) => list?.id),
    }
  }, [campaign, id])

  return { data: initialFormData, isLoading }
}
