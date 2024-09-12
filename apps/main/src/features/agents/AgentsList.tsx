import { useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { useRouter } from 'next/router'
import { shallowEqual } from 'react-redux'
import { useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { ROUTES } from '@/constants/routes'
import { FeaturePermission } from '@/features/common/permissions/FeaturePermissions'
import { EManagerPermissions } from '@/constants/profile'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/AgentsList.styled'
import {
  selectAgentsPagination,
  asyncGetAgentsList,
  selectSort,
  selectStatusFilter,
  reset,
} from './store/agents'
import { AgentsListTable } from './containers/tables/AgentsListTable'

const DeleteAgentModal = dynamic(
  () =>
    import('./containers/modals/DeleteAgentModal').then((mod) => mod.DeleteAgentModal),
  {
    ssr: false,
  },
)

const EditAgentModal = dynamic(
  () => import('./containers/modals/EditAgentModal').then((mod) => mod.EditAgentModal),
  {
    ssr: false,
  },
)

const CampaignInfoModal = dynamic(
  () =>
    import('./containers/modals/CampaignInfoModal').then((mod) => mod.CampaignInfoModal),
  {
    ssr: false,
  },
)

export const AgentsList = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page, limit },
    sort: { orderBy, sortBy },
    statusFilter,
  } = select(
    createStructuredSelector({
      pagination: selectAgentsPagination,
      sort: selectSort,
      statusFilter: selectStatusFilter,
    }),
    shallowEqual,
  )

  const goToCreateAgentPage = () => {
    router.push(ROUTES.CREATE_AGENT)
  }

  useEffect(() => {
    dispatch(
      asyncGetAgentsList({
        page: 1,
        limit: limit ?? 8,
        orderBy,
        workStatus: statusFilter,
        ...(sortBy && { sortBy }),
      }),
    )
  }, [limit, sortBy, orderBy, statusFilter])

  const handleChangePage = useCallback(
    (newPage) => {
      dispatch(
        asyncGetAgentsList({
          page: newPage,
          limit: limit ?? 8,
          orderBy,
          workStatus: statusFilter,
          ...(sortBy && { sortBy }),
        }),
      )
    },
    [sortBy, orderBy, statusFilter],
  )

  useUnmount(() => {
    dispatch(reset())
  })

  return (
    <>
      <Container>
        <Panel>
          <FeaturePermission permissions={[EManagerPermissions.CREATE_AGENT]}>
            <FilledButton
              size="m"
              maxWidth="236px"
              width="100%"
              startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
              onClick={goToCreateAgentPage}
            >
              {t('add-agent')}
            </FilledButton>
          </FeaturePermission>
        </Panel>
        <TableContainer>
          <AgentsListTable />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 8))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </PaginationContainer>
      </Container>
      <DeleteAgentModal />
      <EditAgentModal />
      <CampaignInfoModal />
    </>
  )
}
