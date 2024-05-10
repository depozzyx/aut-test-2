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
    { label: t('headers.lead-id'), value: 'id' },
    { label: t('headers.lead-name'), value: 'name' },
    { label: t('headers.lead-phone'), value: 'phone' },
    { label: t('headers.lead-timezone'), value: 'timezone' },
    { label: t('headers.lead-status'), value: 'status' },
    { label: t('headers.lead-source'), value: 'source' },
    { label: <LeadsSelect maxMenuHeight={200} width="213px" />, value: 'selectLeads' },
  ]

  const rows = data.map((campaign) => ({
    row: {
      id: <InfoColumn title={campaign.id} />,
      name: <InfoColumn title={campaign.name} />,
      phone: <InfoColumn title={campaign.phone} />,
      timezone: <InfoColumn title={campaign.timezone} />,
      status: <StatusChip status={campaign.status} />,
      source: <InfoColumn title={campaign.source} />,
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
