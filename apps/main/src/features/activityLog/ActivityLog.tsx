import { Tabs } from '@/components/Tabs'
import { TTabsProps } from '@/components/Tabs/Tabs'
import { ActivityIcon } from '@/icons/ActivityIcon'
import { BusinessIcon } from '@/icons/BusinessIcon'
import { Box } from '@peiko/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Flex } from '@/components/Flex'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { RangeDayPicker } from '@/components/RangeDayPicker'
import { useRedux } from '@/hooks/use-redux'
import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/icons/SearchFieldIcon'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { dateToString } from '@/utils/date-to-string'
import { useFilters } from './hooks/useFilters'
import { ActivityLogs } from './containers/ActivityLogs'
import {
  deleteFilter,
  getActivityLogsAsync,
  resetFilters,
  selectFilters,
  selectIsLoading,
  selectLogs,
  selectPagination,
  setFilters,
} from './store/activity-log'

export const ActivityLog: FC = () => {
  const { t } = useTranslation('activity-log')
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page, limit },
    filters,
    logs,
    loading,
  } = select(
    createStructuredSelector({
      filters: selectFilters,
      pagination: selectPagination,
      logs: selectLogs,
      loading: selectIsLoading,
    }),
    shallowEqual,
  )

  const { actionTypes, orderBy, managers } = useFilters()

  const tabs: TTabsProps['tabs'] = [
    {
      label: t('tabs.general'),
      value: 'general',
      icon: (color) => <ActivityIcon color={color} />,
    },
    {
      label: t('tabs.business'),
      value: 'business',
      icon: (color) => <BusinessIcon color={color} />,
      disabled: true,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].value)

  const setSelectedFilter = (filterName: keyof typeof filters, value?: string) =>
    dispatch(setFilters({ ...filters, [filterName]: value }))

  const deleteSelectedFilter = (filterName: keyof typeof filters) =>
    dispatch(deleteFilter(filterName))

  useEffect(() => {
    dispatch(
      getActivityLogsAsync({
        page,
        limit,
        ...filters,
      }),
    )
  }, [filters])

  const onChangePage = (page: number) =>
    dispatch(
      getActivityLogsAsync({
        page,
        limit,
        ...filters,
      }),
    )

  const onDateChange = useCallback(
    (date) => {
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

  return (
    <Box styles={{ marginTop: '10px' }}>
      <Tabs
        tabSize="168px"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <Flex margin="18px 0 0" align="center" gap="24px">
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
            selectedOptions={orderBy.filter((item) => filters.orderBy === item.value)}
            minWidth="210px"
            options={orderBy}
            onChange={(selectedEl) => setSelectedFilter('orderBy', selectedEl[0].value)}
          />
          <DropdownMenu
            maxHeight="350px"
            triggerElement={(isOpen) => (
              <BaseTrigger>
                {t('filters.users')}{' '}
                <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
              </BaseTrigger>
            )}
            selectedOptions={managers.filter(
              (item) => filters.entityAction === item.value,
            )}
            minWidth="210px"
            options={managers}
            onChange={(selectedEl) => setSelectedFilter('userId', selectedEl[0].value)}
          />
          <RangeDayPicker
            dateValue={{
              from: filters.fromDate ? new Date(filters.fromDate) : undefined,
              to: filters.toDate ? new Date(filters.toDate) : undefined,
            }}
            onChange={onDateChange}
          />
        </Flex>
      </Flex>
      <Flex
        gap="48px"
        align="center"
        styles={{
          display: Object.keys(filters).length === 0 ? 'none' : 'flex',
          marginTop: '24px',
        }}
      >
        {(filters.entityAction || filters.entityType || filters.userId) && (
          <Flex gap="16px" align="center">
            {filters.entityAction && (
              <PikedFilter onClose={() => deleteSelectedFilter('entityAction')}>
                {actionTypes.find(({ value }) => filters.entityAction === value)?.label}
              </PikedFilter>
            )}
            {filters.orderBy && (
              <PikedFilter onClose={() => deleteSelectedFilter('orderBy')}>
                {orderBy.find(({ value }) => filters.orderBy === value)?.label}
              </PikedFilter>
            )}
            {filters.userId && (
              <PikedFilter onClose={() => deleteSelectedFilter('userId')}>
                {managers.find(({ value }) => filters.userId === value)?.label}
              </PikedFilter>
            )}
          </Flex>
        )}
        <OutlinedButton size="s" onClick={() => dispatch(resetFilters())}>
          {t('filters.reset')}
        </OutlinedButton>
      </Flex>
      <ActivityLogs
        pagination={{ total, limit, page }}
        logs={logs}
        loading={loading}
        onChangePage={onChangePage}
      />
    </Box>
  )
}
