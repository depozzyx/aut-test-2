import { useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { DashboardTabs } from '@/components/DashboardTabs'
import { createStructuredSelector } from 'reselect'
import {
  asyncGetActiveAgents,
  selectAgentsPagination,
  selectStatusFilter,
  selectSort,
  setStatusFilter,
  selectSearchTerm,
} from '@/features/agents/store/agents'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { Pagination } from '@peiko/components/Pagination'
import { StatusFilter } from '@/features/agents/containers/filters/StatusFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton/OutlinedButton'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { ActiveAgentsTable } from './containers/tables/ActiveAgentsTable'
import { AgentSearchField } from './components/AgentSearchField'

export const ActiveAgents = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page, limit },
    sort: { orderBy, sortBy },
    statusFilter,
    searchTerm,
  } = select(
    createStructuredSelector({
      pagination: selectAgentsPagination,
      sort: selectSort,
      statusFilter: selectStatusFilter,
      searchTerm: selectSearchTerm,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(
      asyncGetActiveAgents({
        page: 1,
        limit: limit ?? 7,
        orderBy,
        ...(sortBy && { sortBy }),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { workStatus: statusFilter }),
      }),
    )
  }, [limit, searchTerm, sortBy, orderBy, statusFilter])

  const fetchAgents = (newPage: number) =>
    dispatch(
      asyncGetActiveAgents({
        page: newPage,
        limit: limit ?? 7,
        orderBy,
        ...(sortBy && { sortBy }),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { workStatus: statusFilter }),
      }),
    )
  const handleChangePage = useCallback(
    (newPage) => fetchAgents(newPage),
    [searchTerm, sortBy, orderBy, statusFilter],
  )

  const handleResetStatusFilter = useCallback(() => {
    dispatch(setStatusFilter(undefined))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAgents(page)
    }, 5000)

    return () => clearInterval(interval)
  }, [page, limit, searchTerm, sortBy, orderBy, statusFilter])

  return (
    <Flex direction="column" padding="12px 0 0 0">
      <DashboardTabs />
      <Flex padding="12px 0 0 0" justify="space-between">
        <Flex gap={16} align="center" width="100%">
          <AgentSearchField />
          <StatusFilter />
        </Flex>
      </Flex>
      <Flex
        gap={16}
        align="center"
        styles={{
          display: !statusFilter ? 'none' : 'flex',
          marginTop: '12px',
        }}
      >
        {statusFilter && (
          <Flex gap="16px" align="center">
            {statusFilter && (
              <PikedFilter onClose={() => handleResetStatusFilter()}>
                {t(`work-statuses.${statusFilter}`)}
              </PikedFilter>
            )}
          </Flex>
        )}
        <OutlinedButton size="s" onClick={() => handleResetStatusFilter()}>
          {t('reset-filters')}
        </OutlinedButton>
      </Flex>
      <ActiveAgentsTable />
      <Flex padding="40px 0 0 0" justify="center">
        <Pagination
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 8))}
          currentPage={page}
          onChange={handleChangePage}
        />
      </Flex>
    </Flex>
  )
}
