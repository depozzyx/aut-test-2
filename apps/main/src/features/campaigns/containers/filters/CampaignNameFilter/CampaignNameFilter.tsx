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

type TProps = {
  type: TCampaignTableType
  useIdForValue?: boolean
}

export const CampaignNameFilter = ({
  type,
  useIdForValue = false,
}: TProps): JSX.Element => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('campaigns')
  const { campaignOptions, loadMoreCampaigns } = useCampaignNameFilter(
    type,
    useIdForValue,
  )

  const filterCampaignName = select(selectFilterCampaignName, shallowEqual)

  const handleOnChange = (value: string | number) => {
    dispatch(setFilterCampaignName(value as string))
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
      selectedOptions={campaignOptions.filter(
        (item) => filterCampaignName === item.value,
      )}
      minWidth="210px"
      options={campaignOptions}
      onChange={(selectedEl) => handleOnChange(selectedEl[0].value)}
      onMenuScrollToBottom={loadMoreCampaigns}
    />
  )
}
