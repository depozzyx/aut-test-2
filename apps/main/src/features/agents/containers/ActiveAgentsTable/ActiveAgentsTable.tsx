import { memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { deepEqual } from '@/utils/deep-equal'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { Pagination } from '@peiko/components/Pagination'
import { THeader } from '@peiko/components/Table/types'
import { InfoColumn } from '../../components/InfoColumn'
import { selectActiveAgents, selectAgentsPagination } from '../../store/agents'

type TActiveAgentsRowKeys =
  | 'name'
  | 'status'
  | 'callsHandled'
  | 'callDuration'
  | 'rating'
  | 'timeOnline'
  | 'sumCallDuration'
  | 'activeSession'

export const ActiveAgentsTable = memo((): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select } = useRedux()

  const {
    pagination: { total, page },
    activeAgents,
  } = select(
    createStructuredSelector({
      pagination: selectAgentsPagination,
      activeAgents: selectActiveAgents,
    }),
    shallowEqual,
  )

  const headers: THeader<TActiveAgentsRowKeys>[] = [
    { label: t('active-agents-headers.agent-name'), value: 'name' },
    { label: t('active-agents-headers.agent-status'), value: 'status' },
    { label: t('active-agents-headers.calls-handled'), value: 'callsHandled' },
    { label: t('active-agents-headers.calls-duration'), value: 'callDuration' },
    { label: t('active-agents-headers.rating'), value: 'rating' },
    { label: t('active-agents-headers.time-online'), value: 'timeOnline' },
    { label: t('active-agents-headers.sum-call-duration'), value: 'sumCallDuration' },
    { label: t('active-agents-headers.sum-call-duration'), value: 'activeSession' },
  ]

  const rows = activeAgents.map((agent) => ({
    row: {
      name: <InfoColumn title={agent.name} />,
      status: <InfoColumn title={agent.status} />,
      callsHandled: <InfoColumn title={agent.callsHandled} />,
      callDuration: <InfoColumn title={agent.callDuration} />,
      rating: <InfoColumn title={agent.rating} />,
      timeOnline: <InfoColumn title={agent.timeOnline} />,
      sumCallDuration: <InfoColumn title={agent.sumCallDuration} />,
      activeSession: <InfoColumn title={agent.activeSession} />,
    },
  }))

  return (
    <Flex padding="12px 0 0 0" direction="column" align="center">
      <Table
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
      <Flex padding="40px 0 0 0">
        <Pagination lastPage={total} currentPage={page} />
      </Flex>
    </Flex>
  )
}, deepEqual)

ActiveAgentsTable.displayName = 'ActiveAgentsTable'
