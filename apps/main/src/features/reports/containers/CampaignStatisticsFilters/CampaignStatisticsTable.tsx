import React, { memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { EmptyComponent } from '@peiko/components/Table'
import { TreeTable, TTreeRow } from '@peiko/components/TreeTable'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { HeaderWithSort } from '@/components/HeaderWithSort'

import { formatDuration } from '@/features/campaigns/utils/formatCreateAt'

import { IconButton } from '@peiko/components/buttons/IconButton'
import { MinusIcon } from '@peiko/components/icons/MinusIcon'
import { palette } from '@peiko/styles/palette'
import { Text } from '@peiko/components/Text'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'

import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
import { InfoColumn } from '../../../../components/InfoColumn'
import {
  selectCampaignStatistics,
  selectIsLoading,
  selectReportsOrderBy,
  selectReportsOrder,
  setCampaignStatisticsOrderBy,
  selectReportsGroupBy,
} from '../../store/reports'
import {
  CampaignStatisticMetrics,
  CampaignStatisticOrderBy,
  TCampaignStatisticRow,
} from '../../../../api/rest/reports/types'

type Row = {
  id: string
  groups: React.ReactNode
  duration: React.ReactNode
  callsCount: React.ReactNode
  callsPercent: React.ReactNode
  leadsCount: React.ReactNode
  onCallTime: React.ReactNode
  talkTime: React.ReactNode
  avgOnCallTime: React.ReactNode
  callsPerHour: React.ReactNode
  callsPerTalkHour: React.ReactNode
}

export const CampaignStatisticsTable = memo((): JSX.Element => {
  const { t } = useTranslation('campaign-statistics')
  const { select, dispatch } = useRedux()

  const { data, isLoading, orderBy, order, groupBy } = select(
    createStructuredSelector({
      data: selectCampaignStatistics,
      isLoading: selectIsLoading,
      orderBy: selectReportsOrderBy,
      order: selectReportsOrder,
      groupBy: selectReportsGroupBy,
    }),
    shallowEqual,
  )

  const [openedRows, setOpenedRows] = React.useState<Array<string | number>>([])

  const headers: Array<THeader<keyof Row>> = [
    {
      label: (
        <HeaderWithSort
          title={groupBy.map((field) => t(`headers.list.${field}`)).join(' / ')}
          onClick={() =>
            dispatch(setCampaignStatisticsOrderBy(CampaignStatisticOrderBy.groups))
          }
          order={orderBy === CampaignStatisticOrderBy.groups ? order : undefined}
        />
      ),
      value: 'groups',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.callsCount')}
          onClick={() =>
            dispatch(setCampaignStatisticsOrderBy(CampaignStatisticOrderBy.callsCount))
          }
          order={orderBy === CampaignStatisticOrderBy.callsCount ? order : undefined}
        />
      ),
      value: 'callsCount',
    },
    {
      label: '%',
      value: 'callsPercent',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.leadsCount')}
          onClick={() =>
            dispatch(setCampaignStatisticsOrderBy(CampaignStatisticOrderBy.leadsCount))
          }
          order={orderBy === CampaignStatisticOrderBy.leadsCount ? order : undefined}
        />
      ),
      value: 'leadsCount',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.duration')}
          onClick={() =>
            dispatch(setCampaignStatisticsOrderBy(CampaignStatisticOrderBy.duration))
          }
          order={orderBy === CampaignStatisticOrderBy.duration ? order : undefined}
        />
      ),
      value: 'duration',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.onCallTime')}
          onClick={() =>
            dispatch(setCampaignStatisticsOrderBy(CampaignStatisticOrderBy.onCallTime))
          }
          order={orderBy === CampaignStatisticOrderBy.onCallTime ? order : undefined}
        />
      ),
      value: 'onCallTime',
    },

    {
      label: (
        <HeaderWithSort
          title={t('headers.list.talkTime')}
          onClick={() =>
            dispatch(setCampaignStatisticsOrderBy(CampaignStatisticOrderBy.talkTime))
          }
          order={orderBy === CampaignStatisticOrderBy.talkTime ? order : undefined}
        />
      ),
      value: 'talkTime',
    },
    {
      label: t('headers.list.avgOnCallTime'),
      value: 'avgOnCallTime',
    },
    {
      label: t('headers.list.callsPerHour'),
      value: 'callsPerHour',
    },
    {
      label: t('headers.list.callsPerTalkHour'),
      value: 'callsPerTalkHour',
    },
  ]

  const getRow = (
    row: TCampaignStatisticRow,
    depth: number,
    parent: CampaignStatisticMetrics | undefined,
    parentId = '',
  ): TTreeRow<Row> => {
    const id = `${parentId}:${depth}-${row.group.field}-${row.group.id}`
    return {
      id,
      groups: <InfoColumn title={row.group.name ?? ''} />,
      callsCount: <InfoColumn title={row.callsCount} styles={{ textAlign: 'right' }} />,
      callsPercent: (
        <InfoColumn
          title={(
            (parent?.callsCount ? row.callsCount / parent.callsCount : 0) * 100
          ).toFixed(2)}
          styles={{ textAlign: 'right' }}
        />
      ),
      leadsCount: <InfoColumn title={row.leadsCount} styles={{ textAlign: 'right' }} />,
      duration: (
        <InfoColumn
          title={formatDuration(row.duration)}
          styles={{ textAlign: 'right' }}
        />
      ),
      onCallTime: (
        <InfoColumn
          title={formatDuration(row.onCallTime)}
          styles={{ textAlign: 'right' }}
        />
      ),
      talkTime: (
        <InfoColumn
          title={formatDuration(row.talkTime)}
          styles={{ textAlign: 'right' }}
        />
      ),
      avgOnCallTime: (
        <InfoColumn
          title={formatDuration(Math.round(row.avgOnCallTime))}
          styles={{ textAlign: 'right' }}
        />
      ),
      callsPerHour: (
        <InfoColumn
          title={(row.callsPerHour ?? 0).toFixed(2)}
          styles={{ textAlign: 'right' }}
        />
      ),
      callsPerTalkHour: (
        <InfoColumn
          title={(row.callsPerTalkHour ?? 0).toFixed(2)}
          styles={{ textAlign: 'right' }}
        />
      ),
      children: row.children
        ? row.children.map((child) => getRow(child, depth + 1, row, id))
        : undefined,
    }
  }

  const rows: Array<TTreeRow<Row>> = data.rows.map((row) => getRow(row, 0, data.total))

  const rowStyleByDepth = [
    {},
    { backgroundColor: hexToRGBA(palette.main3, 0.15) },
    { backgroundColor: hexToRGBA(palette.main3, 0.3) },
    { backgroundColor: hexToRGBA(palette.main3, 0.45) },
    { backgroundColor: hexToRGBA(palette.main3, 0.6) },
    { backgroundColor: hexToRGBA(palette.main3, 0.75) },
    { backgroundColor: hexToRGBA(palette.main3, 0.9) },
    { backgroundColor: hexToRGBA(palette.main3, 1.0) },
  ]

  return (
    <>
      <TreeTable
        minHeight={isLoading ? undefined : '300px'}
        loading={isLoading}
        headerData={headers}
        rows={rows}
        opened={openedRows}
        onOpenClose={setOpenedRows}
        bodyCell={(props) => (
          <BodyCell
            {...props}
            style={{
              ...props.style,
              borderLeft: '1px solid #eee',
              whiteSpace: 'nowrap',
            }}
          />
        )}
        headerCell={(props) => (
          <HeaderCell
            {...props}
            style={{
              ...props.style,
              justifyContent: 'center',
              borderLeft: '1px solid #eee',
            }}
            whiteSpace="nowrap"
          />
        )}
        emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
        buttonCollapse={({ isOpen, onClick }) => (
          <IconButton onClick={onClick} iconColor="main3">
            {!isOpen && <PlusIcon />}
            {isOpen && <MinusIcon />}
          </IconButton>
        )}
        rowStyleByDepth={rowStyleByDepth.slice(0, groupBy.length).toReversed()}
        footerRow={{
          groups: <Text color="base">{t('Total')}</Text>,
          callsCount: data.total.callsCount || 0,
          leadsCount: data.total.leadsCount || 0,
          duration: formatDuration(data.total.duration || 0),
          onCallTime: formatDuration(data.total.onCallTime || 0),
          talkTime: formatDuration(data.total.talkTime || 0),
          avgOnCallTime: formatDuration(Math.round(data.total.avgOnCallTime)),
          callsPerHour: (data.total.callsPerHour || 0).toFixed(2),
          callsPerTalkHour: (data.total.callsPerTalkHour || 0).toFixed(2),
        }}
        footerStyles={{
          fontWeight: 400,
          backgroundColor: palette.main4,
          color: palette.base,
          borderLeft: '1px solid #eee',
          justifyContent: 'right',
        }}
      />
    </>
  )
}, deepEqual)

CampaignStatisticsTable.displayName = 'CampaignStatisticsTable'
