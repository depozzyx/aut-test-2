import { useEffect, useState } from 'react'
import {
  TActiveCampaign,
  TCampaignTableType,
  TCampaign,
} from '@/features/campaigns/types'
import { useRedux } from '@/hooks/use-redux'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { apiCampaigns } from '@/api-rest/campaigns'
import { handleRestError } from '@/features/common/error'
import { TCampaignListReq } from '@/api-rest/campaigns/types'

type TCampaigns = TActiveCampaign[] | TCampaign[]

type TReturn = {
  campaignsOptions: { label: string; value: string | number }[]
  pagination: { total: number; page: number; limit?: number }
  fetcher: (params: TCampaignListReq) => void
}

export const useCampaignNameFilter = (
  type: TCampaignTableType,
  useIdForValue = false,
): TReturn => {
  const [campaigns, setCampaigns] = useState<TCampaigns>([])
  const [pagination, setPagination] = useState({ total: 1, page: 1, limit: 10 })
  const { dispatch } = useRedux()

  const params: TCampaignListReq = {
    page: pagination.page,
    limit: pagination.limit,
    orderBy: 'ASC',
  }

  const { getCampaignList, getActiveCampaigns } = apiCampaigns

  const apiRequest =
    type === CAMPAIGN_TABLE_TYPES.LIST ? getCampaignList : getActiveCampaigns

  const fetcher = async (params: TCampaignListReq): Promise<void> => {
    try {
      const { data } = await apiRequest(params)
      setCampaigns((prev) => [...prev, ...data.data])
      setPagination(data.pagination)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  useEffect(() => {
    fetcher(params)
  }, [pagination.page, pagination.limit])

  const campaignsOptions = campaigns?.map((campaign) => ({
    label: campaign.name,
    value: useIdForValue ? campaign.id : campaign.name,
  }))

  return { campaignsOptions, pagination, fetcher }
}
