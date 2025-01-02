import useTranslation from 'next-translate/useTranslation'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { TLeadStatusLog } from '@/api-rest/leads/types'
import { InfoCell } from '@/features/managers/components/InfoCell'
import React from 'react'
import { useTheme } from 'styled-components'

export const LeadStatusLogTable = ({ logs }: { logs: TLeadStatusLog[] }): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const theme = useTheme()

  const columns: { label: string; key: string }[] = [
    { label: t('view-lead.logs.date'), key: 'date' },
    { label: t('view-lead.logs.oldStatus'), key: 'oldStatus' },
    { label: t('view-lead.logs.newStatus'), key: 'newStatus' },
    { label: t('view-lead.logs.user'), key: 'user' },
  ]

  const data = logs.map((log) => ({
    id: log.id,
    date: formatCreatedAt(log.createdAt),
    oldStatus: log.details.status.old,
    newStatus: log.details.status.new,
    user: log.user.username,
  }))

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
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '8px',
            }}
          >
            <span style={{ marginRight: '20px' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
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
              <div key={key} style={{ flex: 1, padding: '8px' }}>
                <InfoCell title={item[key as keyof typeof item]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
