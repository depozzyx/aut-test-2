import { useEffect, useRef, useState } from 'react'
import { Flex } from '@/components/Flex'
import { DashboardTabs } from '@/components/DashboardTabs'
import { createStructuredSelector } from 'reselect'

import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'

import { useUnmount } from 'react-use'
import { Box } from '@peiko/components/Box'
import { CampaignStatisticsFilters } from './containers/filter'

import {
  selectReportsOrderBy,
  selectReportsOrder,
  selectIsLoading,
  selectReportsFilters,
  selectReportsGroupBy,
  getCampaignStatistics,
  setCampaignStatisticsGroupBy,
  reset,
  setCampaignStatisticsFilters,
} from './store/reports'
import { CampaignStatisticFields } from '../../api/rest/reports/types'
import { CampaignStatisticsTable } from './containers/CampaignStatisticsFilters'

export const ActiveCallsStatistics = (): JSX.Element => {
  const { select, dispatch } = useRedux()
  const { orderBy, order, isLoading, filter, groupBy } = select(
    createStructuredSelector({
      orderBy: selectReportsOrderBy,
      order: selectReportsOrder,
      isLoading: selectIsLoading,
      filter: selectReportsFilters,
      groupBy: selectReportsGroupBy,
    }),
    shallowEqual,
  )

  const [type] = useState<'calls' | 'leads'>('calls')

  const [fetchStart, setFetchStart] = useState<number | null>(null)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Ref to track if the initial fetch has been triggered
  const initialFetchTriggered = useRef(false)

  const fetchReport = () => {
    dispatch(
      getCampaignStatistics({
        orderBy,
        order,
        filter,
        groupBy,
        type,
      }),
    )
  }

  useEffect(() => {
    if (isLoading) {
      setFetchStart(Date.now())
    } else {
      const end = Date.now()
      const timeoutTimer = setTimeout(
        fetchReport,
        fetchStart && end - fetchStart > 0
          ? Math.max((end - fetchStart) * 2, 5000)
          : 5000,
      )
      setFetchStart(null)
      setTimer(timeoutTimer)
    }
  }, [isLoading])

  const destructor = () => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
  }

  useEffect(() => {
    if (initialFetchTriggered.current) {
      destructor()
      fetchReport()
    }
    return destructor
  }, [orderBy, order, filter, groupBy, type])

  useEffect(() => {
    dispatch(
      setCampaignStatisticsGroupBy([
        CampaignStatisticFields.campaign,
        CampaignStatisticFields.leadList,
        CampaignStatisticFields.status,
      ]),
    )
    dispatch(setCampaignStatisticsFilters({ ...filter, onlyActive: true }))
    initialFetchTriggered.current = true
  }, [dispatch])

  useUnmount(() => {
    destructor()
    dispatch(reset())
  })

  return (
    <Flex direction="column" padding="12px 0 0 0">
      <DashboardTabs />
      <Flex padding="12px 0 0 0" justify="space-between">
        <Flex gap={16} align="center" width="100%">
          <CampaignStatisticsFilters
            inactiveFilters={{ date: true, campaignId: true, onlyActive: true }}
            disabled={isLoading}
            filters={filter}
          />
        </Flex>
      </Flex>

      <Box styles={{ marginTop: '12px' }}>
        <CampaignStatisticsTable />
      </Box>
    </Flex>
  )
}
