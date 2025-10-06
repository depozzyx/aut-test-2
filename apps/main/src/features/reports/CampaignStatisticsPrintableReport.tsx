import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { ReportTable } from '@peiko/components/ReportTable'
import { formatDuration } from '@/features/campaigns/utils/formatCreateAt'
import { palette } from '@peiko/styles/palette'
import { InlineLoader } from '@peiko/components/loaders/InlineLoader'
import { EmptyComponent } from '@peiko/components/Table'
import {
  selectCampaignStatistics,
  selectReportsFilters,
  selectReportsGroupBy,
  selectReportsOrder,
  selectReportsOrderBy,
  selectIsLoading,
} from './store/reports'
import {
  CampaignStatisticFields,
  TCampaignStatisticRow,
} from '../../api/rest/reports/types'

// Printable style report: groups rows by leadList; each leadList renders its own bordered table
export const CampaignStatisticsPrintableReport: React.FC = () => {
  const { t } = useTranslation('campaign-statistics')
  const { select } = useRedux()

  const { data, groupBy, isLoading } = select(
    createStructuredSelector({
      data: selectCampaignStatistics,
      orderBy: selectReportsOrderBy,
      order: selectReportsOrder,
      filter: selectReportsFilters,
      groupBy: selectReportsGroupBy,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  type ColKey =
    | 'id'
    | 'name'
    | 'callsCount'
    | 'leadsCount'
    | 'duration'
    | 'onCallTime'
    | 'talkTime'
    | 'avgOnCallTime'
    | 'callsPerHour'
    | 'callsPerTalkHour'

  const buildHeaders = (leafDepth: number) => {
    const fieldForName = groupBy[leafDepth] || groupBy[groupBy.length - 1]
    return [
      { value: 'id', label: '', width: '50px' },
      { value: 'name', label: t(`headers.list.${fieldForName}`), width: '220px' },
      { value: 'callsCount', label: t('headers.list.callsCount'), align: 'right' },
      { value: 'leadsCount', label: t('headers.list.leadsCount'), align: 'right' },
      { value: 'duration', label: t('headers.list.duration'), align: 'right' },
      { value: 'onCallTime', label: t('headers.list.onCallTime'), align: 'right' },
      { value: 'talkTime', label: t('headers.list.talkTime'), align: 'right' },
      { value: 'avgOnCallTime', label: t('headers.list.avgOnCallTime'), align: 'right' },
      { value: 'callsPerHour', label: t('headers.list.callsPerHour'), align: 'right' },
      {
        value: 'callsPerTalkHour',
        label: t('headers.list.callsPerTalkHour'),
        align: 'right',
      },
    ] as Array<{
      value: ColKey
      label: string
      width?: string
      align?: 'left' | 'right' | 'center'
    }>
  }

  const makeRow = (r: TCampaignStatisticRow) => ({
    id:
      r.group.field === CampaignStatisticFields.day ||
      r.group.field === CampaignStatisticFields.month
        ? ''
        : r.group.id,
    name: r.group.name,
    callsCount: r.callsCount,
    leadsCount: r.leadsCount,
    duration: formatDuration(r.duration),
    onCallTime: formatDuration(r.onCallTime),
    talkTime: formatDuration(r.talkTime),
    avgOnCallTime: formatDuration(Math.round(r.avgOnCallTime)),
    callsPerHour: r.callsPerHour?.toFixed(2) ?? '',
    callsPerTalkHour: r.callsPerTalkHour?.toFixed(2) ?? '',
  })

  // If there is only one level (all roots are leaves), render a single table.
  const rootsAreLeaves = data.rows.every(
    (r: TCampaignStatisticRow) => !r.children || r.children.length === 0,
  )
  if (rootsAreLeaves) {
    const rows = data.rows.map(makeRow)
    const footerRows = [
      {
        id: '',
        name: t('Total'),
        callsCount: data.total?.callsCount || 0,
        leadsCount: data.total?.leadsCount || 0,
        duration: formatDuration(data.total?.duration || 0),
        onCallTime: formatDuration(data.total?.onCallTime || 0),
        talkTime: formatDuration(data.total?.talkTime || 0),
        avgOnCallTime: formatDuration(Math.round(data.total?.avgOnCallTime || 0)),
        callsPerHour: (data.total?.callsPerHour || 0).toFixed(2),
        callsPerTalkHour: (data.total?.callsPerTalkHour || 0).toFixed(2),
      },
    ]
    const headers = buildHeaders(0)
    return (
      <Box
        styles={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          marginTop: '24px',
        }}
      >
        {isLoading && (
          <InlineLoader variant="table" loading={isLoading} borderRadius={4} />
        )}
        {!isLoading && data.rows.length === 0 && (
          <EmptyComponent text={t('empty-data')} isLoading={isLoading} />
        )}
        {!isLoading && data.rows.length > 0 && (
          <ReportTable<ColKey>
            headers={headers}
            rows={rows}
            footerRows={footerRows}
            borderColor={palette.main20}
            vAlign="middle"
            footerStyles={{ color: palette.base4, fontWeight: 600 }}
          />
        )}
      </Box>
    )
  }

  const renderGroup = (node: TCampaignStatisticRow, depth: number): React.ReactNode => {
    const hasChildren = !!node.children?.length
    if (!hasChildren) return null

    const children = node.children as TCampaignStatisticRow[]
    const childrenHaveChildren = children.some((c) => c.children && c.children.length)

    if (!childrenHaveChildren) {
      const rows = children.map(makeRow)
      const footerRows = [
        makeRow({
          ...node,
          group: { id: 0, name: t('Total') },
        }),
      ]
      const headers = buildHeaders(depth + 1)
      return (
        <Box key={node.group.id} styles={{}}>
          <Text variant="f8" color="main4" styles={{ marginBottom: '8px' }}>
            {`${t(`headers.list.${node.group.field}`)}: ${node.group.name}`}
          </Text>
          <ReportTable<ColKey>
            headers={headers}
            rows={rows}
            footerRows={footerRows}
            borderColor={palette.main20}
            vAlign="middle"
            footerStyles={{ color: palette.base4, fontWeight: 600 }}
          />
        </Box>
      )
    }

    return (
      <Box
        key={node.group.id}
        styles={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <Text variant="f8" color="main4" styles={{ marginBottom: '4px' }}>
          {`${t(`headers.list.${node.group.field}`)}: ${node.group.name}`}
        </Text>
        {children.map((c) => renderGroup(c, depth + 1))}
      </Box>
    )
  }

  return (
    <Box
      styles={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginTop: '24px',
      }}
    >
      {isLoading && <InlineLoader variant="table" loading={isLoading} borderRadius={4} />}
      {!isLoading && data.rows.length === 0 && (
        <EmptyComponent text={t('empty-data')} isLoading={isLoading} />
      )}
      {data.rows.map((root: TCampaignStatisticRow) => renderGroup(root, 0))}
    </Box>
  )
}
