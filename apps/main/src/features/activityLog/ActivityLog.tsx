import { Tabs } from '@/components/Tabs'
import { TTabsProps } from '@/components/Tabs/Tabs'
import { ActivityIcon } from '@/icons/ActivityIcon'
import { BusinessIcon } from '@/icons/BusinessIcon'
import { Box } from '@peiko/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { Flex } from '@/components/Flex'
import { DropdownMenu } from '@/components/DropdownMenu'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { TValue } from '@/components/DropdownMenu/DropdownMenu'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { TActivityLogsReq } from '@/api-rest/activity-logs/types'
import { useActivityLogs } from './hooks/useActivityLogs'
import { useFilters } from './hooks/useFilters'
import { ActivityLogs } from './containers/ActivityLogs'

export const ActivityLog: FC = () => {
  const { t } = useTranslation('activity-log')
  const {
    getActivityLogsAsync,
    logs,
    pagination: { total, limit, page },
    loading,
  } = useActivityLogs()
  const { actionTypes, orderBy, managers } = useFilters()
  const [selectedFilters, setSelectedFilters] = useState<{
    actionType?: TValue[]
    orderBy?: TValue[]
    manager?: TValue[]
  }>({})

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

  const onChangePage = (page: number) =>
    getActivityLogsAsync({
      page,
      limit,
      orderBy:
        (selectedFilters.orderBy?.[0].value as TActivityLogsReq['orderBy']) ?? 'DESC',
      entityAction: selectedFilters.actionType?.[0]
        .value as TActivityLogsReq['entityAction'],
      userId: selectedFilters.manager?.[0].value,
    })

  const setSelectedFilter = (
    filterName: keyof typeof selectedFilters,
    value?: TValue[],
  ) => setSelectedFilters({ ...selectedFilters, [filterName]: value })

  const deleteSelectedFilter = (filterName: keyof typeof selectedFilters) =>
    setSelectedFilters((prev) => {
      const copyPrev = { ...prev }
      delete copyPrev[filterName]
      return copyPrev
    })

  useEffect(() => {
    getActivityLogsAsync({
      page,
      limit,
      orderBy:
        (selectedFilters.orderBy?.[0].value as TActivityLogsReq['orderBy']) ?? 'DESC',
      entityAction: selectedFilters.actionType?.[0]
        .value as TActivityLogsReq['entityAction'],
      userId: selectedFilters.manager?.[0].value,
    })
  }, [selectedFilters])

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
            selectedOptions={selectedFilters.actionType}
            minWidth="210px"
            options={actionTypes}
            onChange={(selectedEl) => setSelectedFilter('actionType', selectedEl)}
          />
          <DropdownMenu
            maxHeight="350px"
            triggerElement={(isOpen) => (
              <BaseTrigger>
                {t('filters.sort_by')}{' '}
                <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
              </BaseTrigger>
            )}
            selectedOptions={selectedFilters.orderBy}
            minWidth="210px"
            options={orderBy}
            onChange={(selectedEl) => setSelectedFilter('orderBy', selectedEl)}
          />
          <DropdownMenu
            maxHeight="350px"
            triggerElement={(isOpen) => (
              <BaseTrigger>
                {t('filters.users')}{' '}
                <ArrowIcon color="main5" size="s" direction={isOpen ? 'up' : 'down'} />
              </BaseTrigger>
            )}
            selectedOptions={selectedFilters.manager}
            minWidth="210px"
            options={managers}
            onChange={(selectedEl) => setSelectedFilter('manager', selectedEl)}
          />
        </Flex>
      </Flex>
      <Flex
        gap="48px"
        align="center"
        styles={{
          display: Object.keys(selectedFilters).length === 0 ? 'none' : 'flex',
          marginTop: '24px',
        }}
      >
        <Flex gap="16px" align="center">
          {selectedFilters.actionType && (
            <PikedFilter onClose={() => deleteSelectedFilter('actionType')}>
              {selectedFilters.actionType[0].label}
            </PikedFilter>
          )}
          {selectedFilters.orderBy && (
            <PikedFilter onClose={() => deleteSelectedFilter('orderBy')}>
              {selectedFilters.orderBy[0].label}
            </PikedFilter>
          )}
          {selectedFilters.manager && (
            <PikedFilter onClose={() => deleteSelectedFilter('manager')}>
              {selectedFilters.manager[0].label}
            </PikedFilter>
          )}
        </Flex>
        <OutlinedButton size="s" onClick={() => setSelectedFilters({})}>
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
