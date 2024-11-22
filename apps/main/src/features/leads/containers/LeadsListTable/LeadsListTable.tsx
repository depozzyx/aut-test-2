import { memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ELeadsSortBy } from '@/api-rest/leads/types'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { StatusChip } from '../../components/StatusChip'
import { InfoColumn } from '../../components/InfoColumn'
import { selectIsLoading, selectLeadsList, setLeadsSortBy } from '../../store/leads'
import { LeadsSelect } from '../LeadsSelect'

type TLeadsRowKeys =
  | 'id'
  | 'name'
  | 'phone'
  | 'timezone'
  | 'status'
  | 'feedbackStatus'
  | 'source'
  | 'campaign'
  | 'selectLeads'
  | 'leadId'

export const LeadsListTable = memo((): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const { select, dispatch } = useRedux()

  const { data, isLoading } = select(
    createStructuredSelector({
      data: selectLeadsList,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  const headers: THeader<TLeadsRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-id')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.ID))}
        />
      ),
      value: 'leadId',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-name')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.NAME))}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-phone')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.PHONE))}
        />
      ),
      value: 'phone',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-timezone')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.TIMEZONE))}
        />
      ),
      value: 'timezone',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-status')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.STATUS))}
        />
      ),
      value: 'status',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-source')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.SOURCE))}
        />
      ),
      value: 'source',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.feedback-status')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.FEEDBACK_STATUS))}
        />
      ),
      value: 'feedbackStatus',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.campaign')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.CAMPAIGN))}
        />
      ),
      value: 'campaign',
    },
    { label: <LeadsSelect maxMenuHeight={200} width="213px" />, value: 'selectLeads' },
  ]

  const rows = data.map((lead) => ({
    row: {
      id: lead.id,
      leadId: <InfoColumn title={lead.id} />,
      name: <InfoColumn title={lead.name} />,
      phone: <InfoColumn title={lead.phone} />,
      timezone: <InfoColumn title={lead.timezone} />,
      status: <StatusChip status={lead.status} />,
      source: <InfoColumn title={lead.source} />,
      feedbackStatus: lead.feedbackStatus ? (
        <StatusChip status={lead?.feedbackStatus} />
      ) : (
        ''
      ),
      campaign: <InfoColumn title={lead.leadList.campaign?.name} />,
      selectLeads: <></>,
    },
  }))

  return (
    <Table
      minHeight={isLoading ? undefined : '300px'}
      loading={isLoading}
      headerData={headers}
      rowsData={rows}
      bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
      headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
    />
  )
}, deepEqual)

LeadsListTable.displayName = 'LeadsListTable'
