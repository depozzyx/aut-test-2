import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { SORT_BY } from '@/features/campaigns/constants'
import { HeaderWithSort } from 'components/HeaderWithSort'
import { StatisticsTypeResponse } from '@/features/campaigns/types'
import { TCampaignOrderBy } from '@/api-rest/campaigns/types'
import React from 'react'
import { InfoCell } from '../../../components/InfoCell'
import {
  selectActiveCampaignsForView,
  selectIsLoading,
  setOrderBy,
} from '../../../store/campaigns'
import { formatCreatedAt } from '../../../utils/formatCreateAt'

type TActiveCampaignsRowKeys =
  | 'name'
  | 'date'
  | 'totalCalls'
  | 'onlineAgents'
  | 'onCallAgents'
  | 'waitingClients'
  | 'ringingClients'

export const ActiveCampaignsTable = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select, dispatch } = useRedux()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectActiveCampaignsForView,
    }),
    shallowEqual,
  )

  const orderBy = select((state) => state.campaigns.orderBy)
  const order = select((state) => state.campaigns.order)
  const handleOrderBy = (orderBy: TCampaignOrderBy) => dispatch(setOrderBy(orderBy))

  const getTotalCalls = (statistic?: StatisticsTypeResponse): number => {
    if (statistic) {
      return (
        +(statistic.oncall_agents || 0) +
        +(statistic.ringing_clients || 0) +
        +(statistic.waiting_clients || 0)
      )
    }
    return 0
  }

  const headers: THeader<TActiveCampaignsRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('active-campaigns-headers.campaign-name')}
          onClick={() => handleOrderBy(SORT_BY.NAME)}
          order={orderBy === SORT_BY.NAME ? order : undefined}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('active-campaigns-headers.creation-date')}
          onClick={() => handleOrderBy(SORT_BY.CREATED_AT)}
          order={orderBy === SORT_BY.CREATED_AT ? order : undefined}
        />
      ),
      value: 'date',
    },
    { label: t('active-campaigns-headers.total-calls'), value: 'totalCalls' },
    { label: t('active-campaigns-headers.on-call-agents'), value: 'onCallAgents' },
    { label: t('active-campaigns-headers.online-agents'), value: 'onlineAgents' },
    { label: t('active-campaigns-headers.waiting-clients'), value: 'waitingClients' },
    { label: t('active-campaigns-headers.ringing-clients'), value: 'ringingClients' },
  ]

  const rows = data.map((campaign) => ({
    row: {
      id: campaign.id,
      name: <InfoCell title={campaign.name} />,
      date: <InfoCell title={formatCreatedAt(campaign.createdAt)} />,
      totalCalls: (
        <InfoCell title={`${getTotalCalls(campaign?.statistic)}`} highlightZero />
      ),
      onlineAgents: (
        <InfoCell title={`${campaign?.statistic?.online_agents}`} highlightZero />
      ),
      onCallAgents: (
        <InfoCell title={`${campaign?.statistic?.oncall_agents}`} highlightZero />
      ),
      waitingClients: (
        <InfoCell title={`${campaign?.statistic?.waiting_clients}`} highlightZero />
      ),
      ringingClients: (
        <InfoCell title={`${campaign?.statistic?.ringing_clients}`} highlightZero />
      ),
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
}
