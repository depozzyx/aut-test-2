import { FC, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import {
  selectFilterCampaignName,
  setFilterCampaignName,
} from '@/features/campaigns/store/campaigns'
import { TCampaignTableType } from '@/features/campaigns/types'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'

import { StyledTrigger } from './CampaignNameFilter.styled'

export const CampaignNameFilter: FC<{
  type: TCampaignTableType
  useIdForValue?: boolean
}> = ({ type, useIdForValue = false }) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('campaigns')
  const { campaignsOptions, pagination, fetcher } = useCampaignNameFilter(
    type,
    useIdForValue,
  )

  const { filterCampaignName } = select(
    createStructuredSelector({
      filterCampaignName: selectFilterCampaignName,
    }),
    shallowEqual,
  )

  useEffect(() => {
    if (!useIdForValue || !campaignsOptions.length) return
    const value = campaignsOptions[0]?.value
    if (value) {
      dispatch(setFilterCampaignName(value as number))
    }
  }, [useIdForValue, campaignsOptions, filterCampaignName])

  const handleOnChange = (value: string | number) => {
    dispatch(setFilterCampaignName(value as string))
  }

  const onMenuScrollToBottom = () => {
    const lastPage =
      pagination.total === 0 ? 1 : Math.ceil(pagination.total / (pagination.limit ?? 15))
    if (pagination.page < lastPage)
      fetcher({ page: pagination.page + 1, limit: pagination.limit, orderBy: 'ASC' })
  }

  return (
    <DropdownMenu
      maxHeight="350px"
      triggerElement={(isOpen) => (
        <StyledTrigger>
          {t('campaigns-filter')}{' '}
          <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
        </StyledTrigger>
      )}
      selectedOptions={campaignsOptions.filter(
        (item) => filterCampaignName === item.value,
      )}
      minWidth="210px"
      options={campaignsOptions}
      onChange={(selectedEl) => handleOnChange(selectedEl[0].value)}
      onMenuScrollToBottom={onMenuScrollToBottom}
    />
  )
}
