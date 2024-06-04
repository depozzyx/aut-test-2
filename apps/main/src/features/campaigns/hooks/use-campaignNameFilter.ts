import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { TPagination } from '@/types/entities/pagination'
import { setAgentNameFilter } from '@/features/agents/store/agent-analytics'
import {
  TActiveCampaign,
  TCampaign,
  TCampaignTableType,
} from '@/features/campaigns/types'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TCampaignListReq } from '@/api-rest/campaigns/types'

type TUniversalCampaign = TActiveCampaign | TCampaign

type TCampaignOption = {
  label: string
  value: string | number
}

type TReturn = {
  campaignOptions: { label: string; value: string | number }[]
  pagination: TPagination
  loadMoreCampaigns: () => void
}

export const useCampaignNameFilter = (
  type: TCampaignTableType,
  useIdForValue = false,
): TReturn => {
  const { dispatch } = useRedux()
  const [campaignOptions, setCampaignOptions] = useState<TCampaignOption[]>([])
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 1,
  })

  const apiRequest = useMemo(
    () =>
      type === CAMPAIGN_TABLE_TYPES.LIST
        ? apiCampaigns.getCampaignList
        : apiCampaigns.getActiveCampaigns,
    [type],
  )

  const fetcher = (params: TCampaignListReq) => apiRequest(params).then((res) => res.data)

  const key = useMemo(
    () => (type === CAMPAIGN_TABLE_TYPES.LIST ? '/campaigns' : '/active-campaigns'),
    [type],
  )

  useSWR(
    [key, pagination.page, pagination.limit],
    () =>
      fetcher({
        page: pagination.page,
        limit: pagination.limit,
        orderBy: 'ASC',
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const formattedData = data.data.map((campaign: TUniversalCampaign) => ({
          label: campaign.name,
          value: useIdForValue ? campaign.id : campaign.name,
        }))
        if (formattedData.length > 0 && !campaignOptions.length && useIdForValue) {
          dispatch(setAgentNameFilter(formattedData[0].value))
        }
        setCampaignOptions((prev) => [...prev, ...formattedData])
        setPagination(data.pagination)
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  const loadMoreCampaigns = useCallback(() => {
    const nextPage = pagination.page + 1
    const lastPage = Math.ceil(pagination.total / (pagination.limit ?? 10))
    if (pagination.page < lastPage) {
      setPagination((prev) => ({ ...prev, page: nextPage }))
    }
  }, [pagination])

  return { campaignOptions, pagination, loadMoreCampaigns }
}
