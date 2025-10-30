import { useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { DashboardTabs } from '@/components/DashboardTabs'
import { createStructuredSelector } from 'reselect'
import {
  asyncGetActiveAgents,
  selectAgentsPagination,
  selectStatusFilter,
  setStatusFilter,
  selectSearchTerm,
  selectOrderBy,
  selectOrder,
  setPagination,
} from '@/features/agents/store/agents'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { Pagination } from '@peiko/components/Pagination'
import { StatusFilter } from '@/features/agents/containers/filters/StatusFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton/OutlinedButton'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { LimitSelect } from '@/components/limit-select'
import { AgentSearchField } from './components/AgentSearchField'
import { ActiveAgentsTable } from './containers/tables/ActiveAgentsTable'
import { useActiveAgentUpdates } from '../campaigns/hooks/use-active-agents-update'
import { getLeadStatuses } from '../leads/store/leads'

export const ActiveAgents = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()

  useActiveAgentUpdates()

  const { pagination, orderBy, order, statusFilter, searchTerm } = select(
    createStructuredSelector({
      pagination: selectAgentsPagination,
      orderBy: selectOrderBy,
      order: selectOrder,
      statusFilter: selectStatusFilter,
      searchTerm: selectSearchTerm,
    }),
    shallowEqual,
  )

  const fetchAgents = (newPage: number) =>
    dispatch(
      asyncGetActiveAgents({
        page: newPage,
        limit: 10,
        orderBy,
        order,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { workStatus: statusFilter }),
      }),
    )
  const handleChangePage = useCallback(
    (newPage) => dispatch(setPagination({ ...pagination, page: newPage })),
    [searchTerm, orderBy, order, statusFilter],
  )

  const handleResetStatusFilter = useCallback(() => {
    dispatch(setStatusFilter(undefined))
  }, [])

  useEffect(() => {
    dispatch(getLeadStatuses())
    fetchAgents(1)
  }, [dispatch])

  const changeLimit = (option: SingleValue<TSelectOption>) =>
    option &&
    dispatch(
      setPagination({
        ...pagination,
        limit: +(option.value ?? 10),
      }),
    )

  return (
    <Flex direction="column" padding="12px 0 0 0">
      <DashboardTabs />
      <Flex padding="12px 0 0 0" justify="space-between">
        <Flex gap={16} align="center" width="100%">
          <AgentSearchField />
          <StatusFilter />
          <LimitSelect limit={pagination.limit} onChange={changeLimit} />
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
          lastPage={
            pagination.total === 0
              ? 1
              : Math.ceil(pagination.total / (pagination.limit ?? 10))
          }
          currentPage={pagination.page}
          onChange={handleChangePage}
        />
      </Flex>
    </Flex>
  )
}
