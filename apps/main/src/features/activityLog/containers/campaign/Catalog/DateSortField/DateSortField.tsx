import useTranslation from 'next-translate/useTranslation'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { TFilters } from '@/features/activityLog/hooks/useFilters'
import { useRedux } from '@/hooks/use-redux'
import { selectSort, setSort } from '@/features/campaigns/store/campaigns'
import { TOrderBy } from '@/types/entities/orderBy'

export const DateSortField = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { dispatch, select } = useRedux()

  const campaignSort = select(selectSort)

  const orderBy: TFilters['orderBy'] = [
    { label: t('filterNames.DESC'), value: 'DESC' },
    { label: t('filterNames.ASC'), value: 'ASC' },
  ]

  const handleSetSort = (value: TOrderBy) => {
    dispatch(
      setSort({
        sortBy: 'createdAt',
        orderBy: value,
      }),
    )
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
      selectedOptions={orderBy.filter((item) => campaignSort.orderBy === item.value)}
      minWidth="210px"
      options={orderBy}
      onChange={(selectedEl) => handleSetSort(selectedEl[0].value as TOrderBy)}
    />
  )
}
