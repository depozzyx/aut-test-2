import { useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { DashboardTabs } from '@/components/DashboardTabs'
import { ROUTES } from '@/constants/routes'
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
  const router = useRouter()
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

  const createCampaignHandler = () => {
    router.push(ROUTES.CREATE_AGENT)
  }

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

  const handleChangePage = useCallback(
    (newPage) => {
      dispatch(
        asyncGetActiveAgents({
          page: newPage,
          orderBy,
          ...(sortBy && { sortBy }),
          ...(searchTerm && { search: searchTerm }),
          ...(statusFilter && { workStatus: statusFilter }),
        }),
      )
    },
    [searchTerm, sortBy, orderBy, statusFilter],
  )

  const handleResetStatusFilter = useCallback(() => {
    dispatch(setStatusFilter(undefined))
  }, [])

  return (
    <Flex direction="column" padding="12px 0 0 0">
      <DashboardTabs />
      <Flex padding="12px 0 0 0" justify="space-between">
        <Flex gap={16} align="center" width="100%">
          <AgentSearchField />
          <StatusFilter />
        </Flex>
        <FilledButton
          size="m"
          maxWidth="236px"
          width="100%"
          startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
          onClick={createCampaignHandler}
        >
          {t('add-agent')}
        </FilledButton>
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
                {t(`statuses.${statusFilter}`)}
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
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 7))}
          currentPage={page}
          onChange={handleChangePage}
        />
      </Flex>
    </Flex>
  )
}
