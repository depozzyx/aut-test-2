import React, { memo, useMemo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { deepEqual } from '@peiko/utils/deep-equal'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { AgentStatusChip } from '@/features/agents/components/AgentStatusChip'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { AGENT_ORDER_BY } from '@/features/agents/constants'

import { IconButton } from '@peiko/components/buttons/IconButton'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { UserWithMicro } from '@peiko/components/icons/UserWithMicro'
import { BlockIcon } from '@peiko/components/icons/Block/BlockIcon'
import dynamic from 'next/dynamic'
import { DurationCell } from '@/features/agents/components/DurationCell'
import { BaseImage } from '@peiko/components/BaseImage'
import { StopIcon } from '@peiko/components/icons/StopIcon'
import { agentActions, agentStatusSelector } from '@/features/common/agentStatus/store'

import { ERoles } from '@/constants/profile'
import { leadsApi } from '@/api-rest/leads'
import { TLeadData } from '@/api-rest/leads/types'
import { TActiveAgent } from '@/api-rest/agents/types'
import { InfoColumn } from '@/components/InfoColumn'
import { ORDER } from '@/constants/order'
import { HeadphonesIcon } from '@/components/icons/HeadphonesIcon/HeadphonesIcon'

import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { handleRestError } from '@/features/common/error'
import { userSelectors } from '@/features/common/user'
import { asyncToggleBlockUser } from '@/features/users/store/users'
import {
  selectActiveAgents,
  selectAgentsPagination,
  selectIsLoadingAgents,
  selectOrder,
  selectOrderBy,
  selectSearchTerm,
  selectStatusFilter,
  setOrderBy,
} from '../../../store/agents'

type TActiveAgentsRowKeys =
  | 'name'
  | 'workStatus'
  | 'callsHandled'
  | 'timeOnline'
  | 'duration'
  | 'destination'
  | 'currentCampaign'
  | 'leadStatus'
  | 'lead'
  | 'spy'
  | 'whisper'
  | 'block'

// ticker moved to DurationCell via durationTicker

const LeadModalRaw = dynamic(
  () => import('@/features/leads/containers/modals/LeadModal').then((m) => m.LeadModal),
  { ssr: false },
)
// Memoize modal so it won’t re-render if props object stays the same
const LeadModal = React.memo(LeadModalRaw)
const img = '/images/flags4x3/'

export const ActiveAgentsTable = memo((): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const { setModal, modalState } = useModals()
  const auth = select(userSelectors.user)

  const {
    activeAgents,
    isLoading,
    pagination: { page, limit },
    orderBy,
    order,
    statusFilter,
    searchTerm,
  } = select(
    createStructuredSelector({
      activeAgents: selectActiveAgents,
      isLoading: selectIsLoadingAgents,
      pagination: selectAgentsPagination,
      orderBy: selectOrderBy,
      order: selectOrder,
      statusFilter: selectStatusFilter,
      searchTerm: selectSearchTerm,
    }),
    shallowEqual,
  )

  const [leadData, setLeadData] = useState<TLeadData>()

  const handleViewLead = async (id: number) => {
    const getLeadData = async (id: number): Promise<boolean> => {
      const response = await leadsApi.getLead(id)
      setLeadData(undefined)
      const { data } = response
      if (data?.data) {
        setLeadData(data.data)
        return true
      }
      return false
    }
    try {
      const isLoaded = await getLeadData(id)
      if (isLoaded) {
        setModal({ modalName: MODAL_NAMES.VIEW_LEAD, isOpen: true })
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const { whisperSpy } = select(agentStatusSelector)

  const handleWhisperSpy = async (agent: TActiveAgent, mode: 'whisper' | 'spy') => {
    dispatch(
      agentActions.setWhisperSpy({
        mode,
        exten: agent.pbxName,
        agentId: agent.id,
        agentName: agent.name,
      }),
    )
    dispatch(agentActions.setWhisperSpyLeadId(agent.leadId ?? null))
  }

  const handleBlock = (id: number) => {
    dispatch(asyncToggleBlockUser(ERoles.AGENT, id))
  }

  const isLeadModalOpen =
    modalState?.modalName === MODAL_NAMES.VIEW_LEAD && modalState.isOpen

  const filteredAgents = useMemo(
    () =>
      activeAgents
        .filter(
          (agent) =>
            (!statusFilter ||
              !statusFilter.length ||
              agent.workStatus.includes(statusFilter ?? '')) &&
            (!searchTerm || agent.name.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .toSorted((a, b) => {
          let compare = 0
          if (orderBy === AGENT_ORDER_BY.USERNAME) {
            compare = a.name.localeCompare(b.name)
          } else if (orderBy === AGENT_ORDER_BY.WORK_STATUS) {
            compare = a.workStatus.localeCompare(b.workStatus)
          }
          return order === ORDER.ASC ? compare : -compare
        })
        .slice((page - 1) * (limit ?? 10), page * (limit ?? 10)),
    [activeAgents, page, limit, searchTerm, orderBy, order, statusFilter],
  )

  const rows = useMemo(
    () =>
      filteredAgents.map((agent) => ({
        row: {
          id: agent.id,
          name: <InfoColumn title={agent.name} />,
          workStatus: <AgentStatusChip status={agent.workStatus} />,
          timeOnline: (
            <DurationCell startedAt={agent.onLineSince ?? null} baseSeconds={0} />
          ),
          duration: <DurationCell startedAt={agent.lastCallAt ?? null} baseSeconds={0} />,
          callsHandled: <InfoColumn title={agent.callsHandled} />,
          destination: (
            <>
              <span
                style={{
                  width: 24,
                  height: 24,
                  minWidth: 24,
                  minHeight: 24,
                  flex: '0 0 24px',
                  display: 'inline-flex',
                  marginRight: 8,
                }}
              >
                {agent.country && (
                  <BaseImage
                    src={`${img}${agent.country?.toLowerCase()}.svg`}
                    alt={agent.country}
                    width={24}
                    height={24}
                  />
                )}
              </span>
              <InfoColumn title={`${agent.destination ?? ''}`} />
            </>
          ),
          currentCampaign: <InfoColumn title={agent.currentCampaign || ''} />,
          leadStatus: <InfoColumn title={agent.leadStatus || ''} />,
          lead: (
            <IconButton
              disabled={!agent.leadId}
              onClick={() => handleViewLead(agent.leadId)}
              iconColor="main3"
            >
              <EyeIcon width="24px" height="24px" />
            </IconButton>
          ),
          spy: (
            <IconButton
              disabled={whisperSpy !== undefined}
              onClick={() => handleWhisperSpy(agent, 'spy')}
              iconColor="main3"
            >
              {whisperSpy?.mode === 'spy' && whisperSpy?.agentId === agent.id ? (
                <StopIcon width="24px" height="24px" />
              ) : (
                <HeadphonesIcon width="32px" height="32px" />
              )}
            </IconButton>
          ),
          whisper: (
            <IconButton
              disabled={whisperSpy !== undefined}
              onClick={() => handleWhisperSpy(agent, 'whisper')}
              iconColor="main3"
            >
              {whisperSpy?.mode === 'spy' && whisperSpy?.agentId === agent.id ? (
                <StopIcon width="24px" height="24px" />
              ) : (
                <UserWithMicro width="32px" height="32px" />
              )}
            </IconButton>
          ),
          block: (
            <IconButton onClick={() => handleBlock(agent.id)} iconColor="main13">
              <BlockIcon width="24px" height="24px" />
            </IconButton>
          ),
        },
      })),
    [filteredAgents, whisperSpy],
  )

  // Modal element depends ONLY on open flag + leadData (NOT on activeAgents)
  const LeadModalElement = useMemo(
    () => (isLeadModalOpen && leadData ? <LeadModal leadData={leadData} /> : null),
    [isLeadModalOpen, leadData],
  )

  const headers: THeader<TActiveAgentsRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('active-agents-headers.agent-name')}
          onClick={() => dispatch(setOrderBy(AGENT_ORDER_BY.USERNAME))}
          order={orderBy === AGENT_ORDER_BY.USERNAME ? order : undefined}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('active-agents-headers.work-status')}
          onClick={() => dispatch(setOrderBy(AGENT_ORDER_BY.WORK_STATUS))}
          order={orderBy === AGENT_ORDER_BY.WORK_STATUS ? order : undefined}
        />
      ),
      value: 'workStatus',
    },
    { label: t('active-agents-headers.time-online'), value: 'timeOnline' },
    { label: t('active-agents-headers.current-campaign'), value: 'currentCampaign' },
    { label: t('active-agents-headers.calls-handled'), value: 'callsHandled' },
    { label: t('active-agents-headers.destination'), value: 'destination' },
    { label: t('active-agents-headers.duration'), value: 'duration' },
    { label: t('active-agents-headers.lead-status'), value: 'leadStatus' },
    { label: t('active-agents-headers.lead'), value: 'lead' },
    ...(auth.pbxAuth?.username
      ? ([
          { label: t('active-agents-headers.spy'), value: 'spy' },
          { label: t('active-agents-headers.whisper'), value: 'whisper' },
        ] as THeader<TActiveAgentsRowKeys>[])
      : []),
    { label: t('active-agents-headers.block'), value: 'block' },
  ]

  return (
    <Flex padding="12px 0 0 0" direction="column" align="center">
      <Table
        loading={false}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
        emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
      />
      {LeadModalElement}
    </Flex>
  )
}, deepEqual)

ActiveAgentsTable.displayName = 'ActiveAgentsTable'
