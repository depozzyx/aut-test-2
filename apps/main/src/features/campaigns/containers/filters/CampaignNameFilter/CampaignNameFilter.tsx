import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { useEffect } from 'react'

import {
  selectFilterCampaignIds,
  setFilterCampaignIds,
} from '@/features/campaigns/store/campaigns'
import { TCampaignTableType } from '@/features/campaigns/types'
import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'

import { TValue } from '@/components/DropdownMenu/DropdownMenu'
import { VirtualizedMultiSelect } from '@/components/MutliSelect'
import { TSelectEvent } from '@/components/MutliSelect/types'

type TProps = {
  type: TCampaignTableType
  useIdForValue?: boolean
  disabled?: boolean
  setCampaignOptions?: (options: TValue[]) => void
}

export const CampaignNameFilter = ({
  type,
  setCampaignOptions,
  useIdForValue = true,
  disabled,
}: TProps): JSX.Element => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('campaigns')
  const { campaignOptions, loadMoreCampaigns, setSearchCampaigns } =
    useCampaignNameFilter(type, useIdForValue)

  useEffect(
    () => setCampaignOptions && setCampaignOptions(campaignOptions),
    [campaignOptions],
  )

  const filterCampaignIds = select(selectFilterCampaignIds, shallowEqual)

  const handleOnChange = (selectedItems: TSelectEvent) => {
    const select = Array.isArray(selectedItems) ? selectedItems : []
    if (!select.length) {
      dispatch(setFilterCampaignIds([]))
    } else if (select.map((o) => o.label).includes('-')) {
      dispatch(setFilterCampaignIds([]))
    } else {
      const selectedIds = select.map((item) => item.value as number)
      dispatch(setFilterCampaignIds(selectedIds))
    }
  }

  const el = (
    <VirtualizedMultiSelect
      name="campaigns-filter"
      value={campaignOptions.filter((option) =>
        filterCampaignIds.includes(option.value as number),
      )}
      options={
        filterCampaignIds.length
          ? campaignOptions
          : campaignOptions.filter((el) => el.label !== '-')
      }
      disabled={disabled}
      onChange={handleOnChange}
      onInputChange={setSearchCampaigns}
      onMenuScrollToBottom={loadMoreCampaigns}
      placeholder={t('campaigns-filter')}
      styles={{
        minWidth: '210px',
      }}
      controlShouldRenderValue={false}
      size="s"
      isSearchable
    />
  )

  return el
}
