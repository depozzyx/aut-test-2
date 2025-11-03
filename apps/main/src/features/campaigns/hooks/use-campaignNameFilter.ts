import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { TPagination } from '@/types/entities/pagination'
import {
  TActiveCampaign,
  TCampaign,
  TCampaignTableType,
} from '@/features/campaigns/types'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TCampaignListReq } from '@/api-rest/campaigns/types'
import { setFilterCampaignIds } from '@/features/campaigns/store/campaigns'

type TUniversalCampaign = TActiveCampaign | TCampaign

export type TCampaignOption = {
  label: string
  value: string | number
}

type TReturn = {
  campaignOptions: { label: string; value: string | number }[]
  pagination: TPagination
  loadMoreCampaigns: () => void
  setSearchCampaigns: (search: string | undefined) => void
}

export const useCampaignNameFilter = (
  type: TCampaignTableType,
  useIdForValue = false,
): TReturn => {
  const { dispatch } = useRedux()
  const [campaignOptions, setCampaignOptions] = useState<TCampaignOption[]>([
    { label: '-', value: '' },
  ])
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 1,
  })
  const [search, setSearchCampaigns] = useState<string>()

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
    [key, pagination.page, pagination.limit, search],
    () =>
      fetcher({
        page: pagination.page,
        limit: pagination.limit,
        search,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const formattedData: TCampaignOption[] = data.data.map(
          (campaign: TUniversalCampaign) => ({
            label: campaign.name,
            value: useIdForValue ? campaign.id : campaign.name,
          }),
        )
        if (formattedData.length > 0 && !campaignOptions.length && useIdForValue) {
          dispatch(
            setFilterCampaignIds(
              formattedData.map((option: TCampaignOption) => +option.value),
            ),
          )
        }
        setCampaignOptions((prev) =>
          formattedData.reduce((acc, item) => {
            if (!acc.find((i) => i.value === item.value)) {
              acc.push(item)
            }
            return acc
          }, prev.slice()),
        )
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

  return { campaignOptions, pagination, loadMoreCampaigns, setSearchCampaigns }
}
