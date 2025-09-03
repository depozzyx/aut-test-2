import { forwardRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { DropdownMenu } from '@/components/DropdownMenu'
import { useRedux } from '@/hooks/use-redux'
import { useStatusFilter } from '@/features/campaigns/hooks/use-statusFilter'
import { selectFilterStatus } from '@/features/campaigns/store/campaigns'
import { TCampaignStatus } from '@/features/campaigns/types'
import { FiltersIcon } from '@/components/icons/FiltersIcon'
import { StyledButton } from './StatusFilter.styled'

const CustomFilterBtn = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  { title?: string }
>(({ title, ...rest }, ref) => {
  const { t } = useTranslation('campaigns')

  return (
    <StyledButton ref={ref} size="s" endIcon={<FiltersIcon />} {...rest}>
      {title || t('filter-by-status')}
    </StyledButton>
  )
})

CustomFilterBtn.displayName = 'CustomFilterBtn'
type TProps = {
  disabled?: boolean
}

export const StatusFilter = ({ disabled }: TProps): JSX.Element => {
  const { select } = useRedux()

  const { statusFilter } = select(
    createStructuredSelector({
      statusFilter: selectFilterStatus,
    }),
    shallowEqual,
  )

  const { handleOnChange, statusOptions } = useStatusFilter()

  return (
    <DropdownMenu
      maxHeight="350px"
      triggerElement={() => <CustomFilterBtn />}
      selectedOptions={statusOptions.filter((item) => statusFilter === item.value)}
      minWidth="210px"
      options={statusOptions}
      disabled={disabled}
      onChange={(selectedEl) => handleOnChange(selectedEl[0].value as TCampaignStatus)}
    />
  )
}
