import React, { memo } from 'react'
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
import { TActiveAgent } from '@/api-rest/agents/types'
import { isString } from 'formik'

import { formatDuration } from '@/utils/date-to-string'
import {
  selectActiveAgents,
  selectIsLoadingAgents,
  setOrderBy,
} from '../../../store/agents'
import { InfoColumn } from '../../../components/InfoColumn'

type TActiveAgentsRowKeys =
  | 'name'
  | 'workStatus'
  | 'callsHandled'
  | 'timeOnline'
  | 'currentCampaign'

export const ActiveAgentsTable = memo((): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()

  const { activeAgents, isLoading } = select(
    createStructuredSelector({
      activeAgents: selectActiveAgents,
      isLoading: selectIsLoadingAgents,
    }),
    shallowEqual,
  )

  const orderBy = select((state) => state.agents.orderBy)
  const order = select((state) => state.agents.order)

  const getTimeOnline = (agent: TActiveAgent) => {
    const loggedTime = isString(agent.timeOnline)
      ? parseFloat(agent.timeOnline)
      : agent.timeOnline
    const ongoingTime = isString(agent.ongoingTime)
      ? parseFloat(agent.ongoingTime)
      : agent.ongoingTime
    const seconds = Math.ceil(loggedTime + ongoingTime)
    return seconds > 0 ? formatDuration(seconds) : ''
  }

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
    { label: t('active-agents-headers.calls-handled'), value: 'callsHandled' },
    { label: t('active-agents-headers.current-campaign'), value: 'currentCampaign' },
  ]

  const rows = activeAgents.map((agent) => ({
    row: {
      id: agent.id,
      name: <InfoColumn title={agent.name} />,
      workStatus: <AgentStatusChip status={agent.workStatus} />,
      timeOnline: <InfoColumn title={getTimeOnline(agent)} />,
      callsHandled: <InfoColumn title={agent.callsHandled} />,
      currentCampaign: <InfoColumn title={agent.currentCampaign || ''} />,
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
        emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
      />
    </Flex>
  )
}, deepEqual)

ActiveAgentsTable.displayName = 'ActiveAgentsTable'
