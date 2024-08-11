import React, { FC, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useUnmount } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import dynamic from 'next/dynamic'

import { Box } from '@peiko/components/Box'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { ActivityTabs } from './containers/ActivityTabs'
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

const ExportLogs = dynamic(
  () => import('./containers/ExportLogs').then((mod) => mod.ExportLogs),
  {
    ssr: false,
  },
)

export const GeneralLog: FC = () => {
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
      <ActivityTabs />
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
