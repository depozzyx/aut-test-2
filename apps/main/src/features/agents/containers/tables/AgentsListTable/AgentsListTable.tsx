import { useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import {
  selectAgentsList,
  selectIsLoadingAgents,
  setSelectedId,
} from '@/features/agents/store/agents'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { InfoColumn } from '../../../components/InfoColumn'
import { CampaignsTooltip } from '../../../components/CampaignsTooltip'
import { useAgentSort } from '../../../hooks/use-agentSort'
import { AGENT_SORT_BY } from '../../../constants'

type TAgentRowKeys = 'username' | 'email' | 'date' | 'edit' | 'delete' | 'campaigns'

export const AgentsListTable = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()
  const { handleSort } = useAgentSort()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoadingAgents,
      data: selectAgentsList,
    }),
    shallowEqual,
  )

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_AGENT, isOpen: true })
  }, [])

  const handleEditAgent = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_AGENT, isOpen: true })
  }, [])

  const headers: THeader<TAgentRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.agent-name')}
          onClick={() => handleSort(AGENT_SORT_BY.USERNAME)}
        />
      ),
      value: 'username',
    },
    { label: t('headers.email'), value: 'email' },
    {
      label: (
        <HeaderWithSort
          title={t('headers.creation-date')}
          onClick={() => handleSort(AGENT_SORT_BY.CREATED_AT)}
        />
      ),
      value: 'date',
    },
    { label: t('headers.campaigns'), value: 'campaigns' },
    { label: t('headers.edit'), value: 'edit' },
    { label: t('headers.delete'), value: 'delete' },
  ]

  const rows = data.map((agent) => {
    const { assignedCampaigns } = agent

    return {
      row: {
        id: agent.id,
        username: <InfoColumn title={agent.username} />,
        email: <InfoColumn title={agent.email} />,
        date: <InfoColumn title={formatCreatedAt(agent.createdAt)} />,
        campaigns: <CampaignsTooltip campaigns={assignedCampaigns} />,
        edit: (
          <IconButton onClick={() => handleEditAgent(agent.id)} iconColor="transparent">
            <EditIcon width="24px" height="24px" />
          </IconButton>
        ),
        delete: (
          <IconButton onClick={() => handleDelete(agent.id)} iconColor="main13">
            <TrashIcon width="24px" height="24px" />
          </IconButton>
        ),
      },
    }
  })

  return (
    <Table
      loading={isLoading}
      headerData={headers}
      rowsData={rows}
      bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
      headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
    />
  )
}
