import { DropdownMenu } from '@/components/DropdownMenu'
import { Flex } from '@/components/Flex'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { useRedux } from '@/hooks/use-redux'
import { Input } from '@peiko/components/inputs/Input'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useCallback } from 'react'
import { dateToString } from '@/utils/date-to-string'
import { SearchFieldIcon } from '@/icons/SearchFieldIcon'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { TDateValue } from '@/inputs/RangeDayPicker/types'
import { LimitSelect } from '@/components/limit-select'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { TFilters, useFilters } from '../../hooks/useFilters'
import {
  getActivityLogsAsync,
  selectFilters,
  selectPagination,
  setFilters,
  setPagination,
} from '../../store/activity-log'

export const Filters: FC<
  Pick<TFilters, 'getManagers' | 'managers' | 'managerPagination'>
> = ({ getManagers, managerPagination: { page, limit, total }, managers }) => {
  const { t } = useTranslation('activity-log')
  const { select, dispatch } = useRedux()

  const filters = select(selectFilters)

  const pagination = select(selectPagination)

  const { actionTypes, orders } = useFilters()

  const setSelectedFilter = (filterName: keyof typeof filters, value?: string | number) =>
    dispatch(setFilters({ ...filters, [filterName]: value }))

  const onDateChange = useCallback(
    (date: TDateValue) => {
      const fromDate = date?.from ? dateToString(date.from) : undefined
      const toDate = date?.to ? dateToString(date.to) : undefined
      const copyFilters = { ...filters, fromDate, toDate }
      if (!copyFilters.fromDate) delete copyFilters.fromDate
      if (!copyFilters.toDate) delete copyFilters.toDate

      if (Object.keys(copyFilters).length === 0) return

      dispatch(setFilters({ ...copyFilters }))
    },
    [filters],
  )

  const onSearch = useCallback(
    (value: string) => {
      const search = value || undefined
      const copyFilters = { ...filters, search }
      if (!copyFilters.search) delete copyFilters.search
      if (Object.keys(copyFilters).length === 0) return
      dispatch(setFilters({ ...copyFilters }))
    },
    [filters],
  )

  const onMenuScrollToBottom = () => {
    const lastPage = total === 0 ? 1 : Math.ceil(total / (limit ?? 10))
    if (page < lastPage) getManagers({ page: page + 1, limit })
  }

  const changeLimit = async (option: SingleValue<TSelectOption>) => {
    if (!option) return
    const newLimit = +option.value
    dispatch(setPagination({ ...pagination, limit: newLimit }))
    dispatch(
      getActivityLogsAsync({
        page: pagination.page,
        limit: newLimit,
        ...filters,
      }),
    )
  }

  return (
    <Flex align="center" gap="24px" styles={{ flex: '1' }}>
      <Input
        name="search"
        maxWidth="374px"
        width="100%"
        size="s"
        startAdornment={() => <SearchFieldIcon />}
        placeholder="Search by account, user role, type of activity..."
        debounce={500}
        onChange={onSearch}
        value={filters.search}
      />
      <Flex gap="12px" align="center">
        <DropdownMenu
          maxHeight="350px"
          triggerElement={(isOpen) => (
            <BaseTrigger>
              {t('filters.filter')}{' '}
              <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
            </BaseTrigger>
          )}
          selectedOptions={actionTypes.filter(
            (item) => filters.entityAction === item.value,
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
              {t('filters.sort_by')}{' '}
              <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
            </BaseTrigger>
          )}
          selectedOptions={orders.filter((item) => filters.order === item.value)}
          minWidth="210px"
          options={orders}
          onChange={(selectedEl) => setSelectedFilter('order', selectedEl[0].value)}
        />
        <DropdownMenu
          maxHeight="350px"
          triggerElement={(isOpen) => (
            <BaseTrigger>
              {t('filters.users')}{' '}
              <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
            </BaseTrigger>
          )}
          selectedOptions={managers.filter((item) => filters.entityAction === item.value)}
          minWidth="210px"
          options={managers}
          onChange={(selectedEl) => setSelectedFilter('userId', selectedEl[0].value)}
          onMenuScrollToBottom={onMenuScrollToBottom}
        />
        <RangeDayPicker
          dateValue={{
            from: filters.fromDate ? new Date(filters.fromDate) : undefined,
            to: filters.toDate ? new Date(filters.toDate) : undefined,
          }}
          onChange={onDateChange}
        />
        <LimitSelect limit={pagination.limit} onChange={changeLimit} />
      </Flex>
    </Flex>
  )
}
