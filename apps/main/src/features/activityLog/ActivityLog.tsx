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
import { format } from 'date-fns'
import { useFilters } from './hooks/useFilters'
import { ActivityLogs } from './containers/ActivityLogs'
import {
  deleteFilter,
  getActivityLogsAsync,
  resetFilters,
  selectActivityLogs,
  setFilters,
} from './store/activity-log'

export const ActivityLog: FC = () => {
  const { t } = useTranslation('activity-log')
  const { select, dispatch } = useRedux()

  const {
    activityLogs,
    pagination: { limit, page, total },
    filters,
    isLoading,
  } = select(selectActivityLogs)

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

  const onDateChange = useCallback((date) => {
    const fromDate = date?.from
      ? format(date.from, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
      : undefined
    const toDate = date?.to ? format(date.to, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") : undefined
    dispatch(setFilters({ ...filters, fromDate, toDate }))
  }, [])

  return (
    <Box styles={{ marginTop: '10px' }}>
      <Tabs
        tabSize="168px"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <Flex margin="18px 0 0">
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
          <RangeDayPicker onChange={onDateChange} />
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
        <OutlinedButton size="s" onClick={() => dispatch(resetFilters())}>
          {t('filters.reset')}
        </OutlinedButton>
      </Flex>
      <ActivityLogs
        pagination={{ total, limit, page }}
        logs={activityLogs}
        loading={isLoading}
        onChangePage={onChangePage}
      />
    </Box>
  )
}
