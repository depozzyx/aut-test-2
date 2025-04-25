import { useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { FeaturePermission } from '@/features/common/permissions/FeaturePermissions'
import { EManagerPermissions } from '@/constants/profile'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { LimitSelect } from '@/components/limit-select'
import { Flex } from '@/components/Flex'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/AgentsList.styled'
import {
  selectAgentsPagination,
  asyncGetAgentsList,
  selectStatusFilter,
  reset,
  selectOrderBy,
  selectOrder,
  setPagination,
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

const CreateNewAgentModal = dynamic(
  () =>
    import('./containers/modals/CreateNewAgentModal').then(
      (mod) => mod.CreateNewAgentModal,
    ),
  {
    ssr: false,
  },
)

export const AgentsList = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const {
    pagination: { total, page, limit },
    orderBy,
    order,
    statusFilter,
  } = select(
    createStructuredSelector({
      pagination: selectAgentsPagination,
      orderBy: selectOrderBy,
      order: selectOrder,
      statusFilter: selectStatusFilter,
    }),
    shallowEqual,
  )

  const openCreateNewAgentModal = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_AGENT, isOpen: true })
  }

  useEffect(() => {
    dispatch(
      asyncGetAgentsList({
        page: 1,
        limit: limit ?? 10,
        orderBy,
        order,
        workStatus: statusFilter,
      }),
    )
  }, [limit, orderBy, order, statusFilter])

  const fetchAgentsList = (newPage?: number) =>
    dispatch(
      asyncGetAgentsList({
        page: newPage || 1,
        limit: limit ?? 10,
        orderBy,
        order,
        workStatus: statusFilter,
      }),
    )

  const handleChangePage = useCallback(
    (newPage) => fetchAgentsList(newPage),
    [orderBy, order, statusFilter],
  )

  const changeLimit = (option: SingleValue<TSelectOption>) =>
    option &&
    dispatch(
      setPagination({
        page,
        limit: +option.value,
        total,
      }),
    )

  useUnmount(() => {
    dispatch(reset())
  })

  return (
    <>
      <Container>
        <Panel>
          <Flex width="100%" justify="flex-end" align="center" gap="16px">
            <LimitSelect limit={limit} onChange={changeLimit} />
            <FeaturePermission permissions={[EManagerPermissions.CREATE_AGENT]}>
              <FilledButton
                size="m"
                maxWidth="236px"
                width="100%"
                startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
                onClick={openCreateNewAgentModal}
              >
                {t('add-agent')}
              </FilledButton>
            </FeaturePermission>
          </Flex>
        </Panel>
        <TableContainer>
          <AgentsListTable />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </PaginationContainer>
      </Container>
      <DeleteAgentModal />
      <EditAgentModal />
      <CampaignInfoModal />
      <CreateNewAgentModal />
    </>
  )
}
