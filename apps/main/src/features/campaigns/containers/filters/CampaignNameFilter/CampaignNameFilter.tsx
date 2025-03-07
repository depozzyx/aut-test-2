import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import {
  selectFilterCampaignIds,
  setFilterCampaignIds,
} from '@/features/campaigns/store/campaigns'
import { TCampaignTableType } from '@/features/campaigns/types'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'

import { TValue } from '@/components/DropdownMenu/DropdownMenu'
import { useEffect } from 'react'
import { StyledTrigger } from './CampaignNameFilter.styled'

type TProps = {
  type: TCampaignTableType
  useIdForValue?: boolean
  setCampaignOptions?: (options: TValue[]) => void
}

export const CampaignNameFilter = ({
  type,
  setCampaignOptions,
  useIdForValue = true,
}: TProps): JSX.Element => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('campaigns')
  const { campaignOptions, loadMoreCampaigns } = useCampaignNameFilter(
    type,
    useIdForValue,
  )

  useEffect(
    () => setCampaignOptions && setCampaignOptions(campaignOptions),
    [campaignOptions],
  )

  const filterCampaignIds = select(selectFilterCampaignIds, shallowEqual)

  const handleOnChange = (selectedItems: TValue[]) => {
    if (selectedItems.map((o) => o.label).includes('-')) {
      dispatch(setFilterCampaignIds([]))
    } else {
      const selectedIds = selectedItems.map((item) => item.value as number)
      dispatch(setFilterCampaignIds(selectedIds))
    }
  }

  return (
    <DropdownMenu
      multiple
      maxHeight="350px"
      triggerElement={(isOpen) => (
        <StyledTrigger>
          {t('campaigns-filter')}{' '}
          <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
        </StyledTrigger>
      )}
      selectedOptions={campaignOptions.filter((option) =>
        filterCampaignIds.includes(option.value as number),
      )}
      minWidth="210px"
      options={
        filterCampaignIds.length
          ? campaignOptions
          : campaignOptions.filter((el) => el.label !== '-')
      }
      onChange={handleOnChange}
      onMenuScrollToBottom={loadMoreCampaigns}
    />
  )
}
