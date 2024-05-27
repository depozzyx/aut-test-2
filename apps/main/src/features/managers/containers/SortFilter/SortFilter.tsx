import useTranslation from 'next-translate/useTranslation'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { useSortFilter } from '@/features/managers/hooks/use-sortFilter'
import { TOrderBy } from '@/types/entities/orderBy'

export const SortFilter = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { selectedSort, sortOptions, setSort } = useSortFilter()

  return (
    <DropdownMenu
      maxHeight="350px"
      triggerElement={(isOpen) => (
        <BaseTrigger>
          {t('sort-by')}{' '}
          <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
        </BaseTrigger>
      )}
      selectedOptions={sortOptions.filter((item) => selectedSort === item.value)}
      minWidth="210px"
      options={sortOptions}
      onChange={(selectedEl) => setSort(selectedEl[0].value as TOrderBy)}
    />
  )
}
