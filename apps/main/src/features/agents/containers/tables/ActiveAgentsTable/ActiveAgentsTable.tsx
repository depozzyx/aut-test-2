import { memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { deepEqual } from '@peiko/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { AgentStatusChip } from '@/features/agents/components/AgentStatusChip'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { AGENT_SORT_BY } from '@/features/agents/constants'
import { useAgentSort } from '@/features/agents/hooks/use-agentSort'
import { selectActiveAgents, selectIsLoadingAgents } from '../../../store/agents'
import { InfoColumn } from '../../../components/InfoColumn'

type TActiveAgentsRowKeys =
  | 'name'
  | 'status'
  | 'date'
  | 'callsHandled'
  | 'callDuration'
  | 'rating'
  | 'timeOnline'
  | 'sumCallDuration'

export const ActiveAgentsTable = memo((): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select } = useRedux()

  const { activeAgents, isLoading } = select(
    createStructuredSelector({
      activeAgents: selectActiveAgents,
      isLoading: selectIsLoadingAgents,
    }),
    shallowEqual,
  )
  const { handleSort } = useAgentSort()

  const headers: THeader<TActiveAgentsRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('active-agents-headers.agent-name')}
          onClick={() => handleSort(AGENT_SORT_BY.CREATED_AT)}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('active-agents-headers.agent-status')}
          onClick={() => handleSort(AGENT_SORT_BY.CREATED_AT)}
        />
      ),
      value: 'status',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.creation-date')}
          onClick={() => handleSort(AGENT_SORT_BY.CREATED_AT)}
        />
      ),
      value: 'date',
    },
    { label: t('active-agents-headers.calls-duration'), value: 'callDuration' },
    { label: t('active-agents-headers.rating'), value: 'rating' },
    { label: t('active-agents-headers.time-online'), value: 'timeOnline' },
    { label: t('active-agents-headers.sum-call-duration'), value: 'sumCallDuration' },
    { label: t('active-agents-headers.calls-handled'), value: 'callsHandled' },
  ]

  const rows = activeAgents.map((agent) => ({
    row: {
      name: <InfoColumn title={agent.username} />,
      status: <AgentStatusChip status={agent.workStatus} />,
      date: <InfoColumn title={formatCreatedAt(agent.createdAt)} />,
      callDuration: <InfoColumn title={agent.averageCallDuration} />,
      rating: <InfoColumn title={agent.conversionRate} />,
      timeOnline: <InfoColumn title={agent.availability} />,
      sumCallDuration: <InfoColumn title={agent.callMinutes} />,
      callsHandled: <InfoColumn title={agent.callsHandled} />,
    },
  }))

  return (
    <Flex padding="12px 0 0 0" direction="column" align="center">
      <Table
        loading={isLoading}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
    </Flex>
  )
}, deepEqual)

ActiveAgentsTable.displayName = 'ActiveAgentsTable'
