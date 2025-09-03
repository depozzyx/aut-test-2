import { forwardRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { DropdownMenu } from '@/components/DropdownMenu'
import { useRedux } from '@/hooks/use-redux'
import { useStatusFilter } from '@/features/agents/hooks/use-statusFilter'
import { FiltersIcon } from '@/components/icons/FiltersIcon'
import { TAgentActiveWorkStatus } from '@/features/agents/types'
import { selectStatusFilter } from '@/features/agents/store/agents'
import { StyledButton } from './StatusFilter.styled'

const CustomFilterBtn = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  { title?: string }
>(({ title, ...rest }, ref) => {
  const { t } = useTranslation('agents')

  return (
    <StyledButton ref={ref} size="s" endIcon={<FiltersIcon />} {...rest}>
      {title || t('filter-by-status')}
    </StyledButton>
  )
})

CustomFilterBtn.displayName = 'CustomFilterBtn'

export const StatusFilter = (): JSX.Element => {
  const { select } = useRedux()

  const { statusFilter } = select(
    createStructuredSelector({
      statusFilter: selectStatusFilter,
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
      onChange={(selectedEl) =>
        handleOnChange(selectedEl[0].value as TAgentActiveWorkStatus)
      }
    />
  )
}
