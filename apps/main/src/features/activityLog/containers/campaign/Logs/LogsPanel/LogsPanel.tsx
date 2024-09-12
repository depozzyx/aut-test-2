import { useCallback } from 'react'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { DropdownMenu } from '@/components/DropdownMenu'
import { Flex } from '@/components/Flex'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { useRedux } from '@/hooks/use-redux'
import { Input } from '@peiko/components/inputs/Input'
import { dateToString } from '@/utils/date-to-string'
import { SearchFieldIcon } from '@/icons/SearchFieldIcon'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { TDateValue } from '@/inputs/RangeDayPicker/types'
import { selectParams, updateParams } from '../../../../store/campaign-log'
import { useCampaignFilters } from '../../../../hooks/campaign/use-campaign-filters'

export const LogsPanel = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { select, dispatch } = useRedux()

  const params = select(selectParams, shallowEqual)

  const { actionTypes, orderBy, sortBy } = useCampaignFilters()

  const setSelectedFilter = (filterName: keyof typeof params, value?: string | number) =>
    dispatch(updateParams({ ...params, [filterName]: value }))

  const onDateChange = useCallback(
    (date: TDateValue) => {
      const fromDate = date?.from ? dateToString(date.from) : undefined
      const toDate = date?.to ? dateToString(date.to) : undefined
      const copyFilters = { ...params, fromDate, toDate }
      if (!copyFilters.fromDate) delete copyFilters.fromDate
      if (!copyFilters.toDate) delete copyFilters.toDate

      if (Object.keys(copyFilters).length === 0) return

      dispatch(updateParams({ ...copyFilters }))
    },
    [params],
  )

  const onSearch = useCallback(
    (value: string) => {
      const search = value || undefined
      const copyFilters = { ...params, search }
      if (!copyFilters.search) delete copyFilters.search
      if (Object.keys(copyFilters).length === 0) return
      dispatch(updateParams({ ...copyFilters }))
    },
    [params],
  )

  return (
    <Flex align="center" justify="flex-end" gap="24px" styles={{ flex: '1' }}>
      <Flex gap="12px" align="center">
        <RangeDayPicker
          dateValue={{
            from: params.fromDate ? new Date(params.fromDate) : undefined,
            to: params.toDate ? new Date(params.toDate) : undefined,
          }}
          onChange={onDateChange}
        />
        <DropdownMenu
          maxHeight="350px"
          triggerElement={(isOpen) => (
            <BaseTrigger>
              {t('filters.filter')}
              <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
            </BaseTrigger>
          )}
          selectedOptions={actionTypes.filter(
            (item) => params.entityAction === item.value,
          )}
          minWidth="210px"
          options={actionTypes}
          onChange={(selectedEl) =>
            setSelectedFilter('entityAction', selectedEl[0].value)
          }
        />
        <DropdownMenu
          maxHeight="350px"
          triggerElement={(isOpen) => (
            <BaseTrigger>
              {t('filters.sort_by')}
              <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
            </BaseTrigger>
          )}
          selectedOptions={sortBy.filter((item) => params.sortBy === item.value)}
          minWidth="210px"
          options={sortBy}
          onChange={(selectedEl) => setSelectedFilter('sortBy', selectedEl[0].value)}
        />
        <DropdownMenu
          maxHeight="350px"
          triggerElement={(isOpen) => (
            <BaseTrigger>
              {t('filters.order_by')}
              <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
            </BaseTrigger>
          )}
          selectedOptions={orderBy.filter((item) => params.orderBy === item.value)}
          minWidth="210px"
          options={orderBy}
          onChange={(selectedEl) => setSelectedFilter('orderBy', selectedEl[0].value)}
        />
        <Input
          name="search"
          maxWidth="180px"
          width="100%"
          size="s"
          startAdornment={() => <SearchFieldIcon />}
          placeholder={t('inputs:placeholder.short-search')}
          debounce={600}
          onChange={onSearch}
          value={params.search}
        />
      </Flex>
    </Flex>
  )
}
