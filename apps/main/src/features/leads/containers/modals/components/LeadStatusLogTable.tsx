import React from 'react'

import useTranslation from 'next-translate/useTranslation'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { TLeadStatusData, TLeadStatusLog } from '@/api-rest/leads/types'
import { useTheme } from 'styled-components'
import { Text } from '@peiko/components/Text'
import { getLeadStatus } from '@/features/leads/containers/LeadsTable'
import { InfoCell } from '@/components/InfoCell'

export const LeadStatusLogTable = ({
  logs,
  leadStatuses,
}: {
  logs: TLeadStatusLog[]
  leadStatuses: TLeadStatusData[]
}): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const theme = useTheme()

  const columns: { label: string; key: string }[] = [
    { label: t('view-lead.logs.date'), key: 'date' },
    { label: t('view-lead.logs.status'), key: 'status' },
    { label: t('view-lead.logs.duration'), key: 'duration' },
    { label: t('view-lead.logs.user'), key: 'user' },
  ]

  const data = logs.map((log) => ({
    id: log.id,
    date: formatCreatedAt(log.createdAt),
    status: getLeadStatus(leadStatuses, log.status),
    duration: log.duration?.toString() ?? '',
    user: log.user,
  }))

  const getColumnFlexWidth = (key: string) =>
    key.toLowerCase().includes('status') ? 2 : 1

  const renderEmptyTable = () => (
    <div
      key={0}
      style={{
        display: 'flex',
        width: '100%',
        borderBottom: `1px solid ${theme.palette.main22}`,
      }}
    >
      <div style={{ justifyItems: 'center', flex: 4 }}>
        <Text variant="f5" color="main4">
          {t('view-lead.logs.noLogs')}
        </Text>
      </div>
    </div>
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          background: theme.palette.main4,
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {columns.map(({ label, key }) => (
          <div
            key={key}
            style={{
              flex: getColumnFlexWidth(key),
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '8px',
              marginRight: '2px',
            }}
          >
            <Text variant="f10" color="base">
              {label}
            </Text>
          </div>
        ))}
      </div>
      <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
        {data.length === 0 && renderEmptyTable()}
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              width: '100%',
              borderBottom: `1px solid ${theme.palette.main22}`,
            }}
          >
            {columns.map(({ key }) => (
              <div
                key={key}
                style={{
                  flex: getColumnFlexWidth(key),
                  padding: '8px',
                }}
              >
                <InfoCell title={item[key as keyof typeof item]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
