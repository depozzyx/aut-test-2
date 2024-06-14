import { Tabs } from '@/components/Tabs'
import { TTabsProps } from '@/components/Tabs/Tabs'
import { ActivityIcon } from '@/icons/ActivityIcon'
import { BusinessIcon } from '@/icons/BusinessIcon'
import { Box } from '@peiko/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useUnmount } from 'react-use'
import { useFilters } from './hooks/useFilters'
import { ActivityLogs } from './containers/ActivityLogs'
import {
  getActivityLogsAsync,
  reset,
  selectFilters,
  selectIsLoading,
  selectLogs,
  selectPagination,
} from './store/activity-log'
import { Filters } from './containers/Filters'
import { SelectedFilters } from './containers/SelectedFilters'
import { useModals } from '../common/modals/hooks/use-modals'
import { MODAL_NAMES } from '../common/modals/constants'
import { ExportLogs } from './containers/ExportLogs'

export const ActivityLog: FC = () => {
  const { t } = useTranslation('activity-log')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

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

  const { managers, getManagers, managerPagination } = useFilters()

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

  useEffect(() => {
    dispatch(
      getActivityLogsAsync({
        page: 1,
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

  useEffect(() => {
    const { limit } = managerPagination
    getManagers({ page: 1, limit, orderBy: 'DESC' })
  }, [])

  const onExport = () => {
    setModal({ modalName: MODAL_NAMES.EXPORT_ACTIVITY_LOGS, isOpen: true })
  }

  useUnmount(() => dispatch(reset()))

  return (
    <Box styles={{ marginTop: '10px' }}>
      <Tabs
        tabSize="168px"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <Flex margin="18px 0 0" align="center" justify="space-between" gap="48px">
        <Filters
          managers={managers}
          getManagers={getManagers}
          managerPagination={managerPagination}
        />
        <FilledButton onClick={onExport} width="236px">
          {t('export')}
        </FilledButton>
      </Flex>
      <SelectedFilters managers={managers} />
      <ActivityLogs
        pagination={{ total, limit, page }}
        logs={logs}
        loading={loading}
        onChangePage={onChangePage}
      />
      <ExportLogs managers={managers} />
    </Box>
  )
}
