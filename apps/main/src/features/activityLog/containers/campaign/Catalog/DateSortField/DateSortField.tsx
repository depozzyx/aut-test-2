import useTranslation from 'next-translate/useTranslation'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { TFilters } from '@/features/activityLog/hooks/useFilters'
import { useRedux } from '@/hooks/use-redux'
import { selectOrder, setOrderBy } from '@/features/campaigns/store/campaigns'
import { TOrder } from '@/types/entities/order'
import { ORDER } from '@/constants/order'
import { SORT_BY } from '@/features/campaigns/constants'
import { setOrder } from '@/features/settings/store/api-key'

export const DateSortField = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { dispatch, select } = useRedux()

  const campaignOrder = select(selectOrder)

  const orders: TFilters['orders'] = [
    { label: t('filterNames.DESC'), value: ORDER.DESC },
    { label: t('filterNames.ASC'), value: ORDER.ASC },
  ]

  const handleOrder = (value: TOrder) => {
    dispatch(setOrderBy(SORT_BY.CREATED_AT))
    dispatch(setOrder(value))
  }

  return (
    <DropdownMenu
      maxHeight="350px"
      triggerElement={(isOpen) => (
        <BaseTrigger>
          {t('filters.sort_by')}{' '}
          <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
        </BaseTrigger>
      )}
      selectedOptions={orders.filter((item) => campaignOrder === item.value)}
      minWidth="210px"
      options={orders}
      onChange={(selectedEl) => handleOrder(selectedEl[0].value as TOrder)}
    />
  )
}
