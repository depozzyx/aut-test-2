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
import { StatusChip } from '../../components/StatusChip'
import { InfoColumn } from '../../components/InfoColumn'
import { selectIsLoading, selectLeadsList } from '../../store/leads'
import { LeadsSelect } from '../LeadsSelect'

type TLeadsRowKeys =
  | 'id'
  | 'name'
  | 'phone'
  | 'timezone'
  | 'status'
  | 'source'
  | 'selectLeads'
  | 'leadId'

export const LeadsListTable = memo((): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const { select } = useRedux()

  const { data, isLoading } = select(
    createStructuredSelector({
      data: selectLeadsList,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  const headers: THeader<TLeadsRowKeys>[] = [
    { label: t('headers.lead-id'), value: 'leadId' },
    { label: t('headers.lead-name'), value: 'name' },
    { label: t('headers.lead-phone'), value: 'phone' },
    { label: t('headers.lead-timezone'), value: 'timezone' },
    { label: t('headers.lead-status'), value: 'status' },
    { label: t('headers.lead-source'), value: 'source' },
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
