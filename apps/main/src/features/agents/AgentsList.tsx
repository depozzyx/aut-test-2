import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useModals from '@/features/common/modals/hooks/use-modals'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/AgentsList.styled'
import {
  selectAgentsPagination,
  selectAgentsList,
  setSelectedId,
} from './store/agents-list'
import { AgentsListTable } from './containers/AgentsListTable'
import { DeleteAgentModal } from './containers/DeleteAgentModal'
import { EditAgentModal } from './containers/EditAgentModal'

export const AgentsList = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const {
    pagination: { total, page },
    agentsList,
  } = select(
    createStructuredSelector({
      pagination: selectAgentsPagination,
      agentsList: selectAgentsList,
    }),
    shallowEqual,
  )

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_AGENT, isOpen: true })
  }, [])

  const handleEditAgent = useCallback(() => {
    setModal({ modalName: MODAL_NAMES.EDIT_AGENT, isOpen: true })
  }, [])

  return (
    <>
      <Container>
        <Panel>
          <FilledButton
            size="m"
            maxWidth="236px"
            width="100%"
            startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
          >
            {t('add-agent')}
          </FilledButton>
        </Panel>
        <TableContainer>
          <AgentsListTable
            data={agentsList}
            onDelete={handleDelete}
            editAgent={handleEditAgent}
          />
        </TableContainer>
        <PaginationContainer>
          <Pagination lastPage={total} currentPage={page} />
        </PaginationContainer>
      </Container>
      <DeleteAgentModal />
      <EditAgentModal />
    </>
  )
}
