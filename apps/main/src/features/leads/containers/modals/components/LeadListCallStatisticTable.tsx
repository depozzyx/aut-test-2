import React from 'react'

import useTranslation from 'next-translate/useTranslation'
import { InfoCell } from '@/features/managers/components/InfoCell'
import { TLeadCallStatusStatisticRawData } from '@/api-rest/lead-list/types'
import { Text } from '@peiko/components/Text'

export const LeadListCallStatisticTable = ({
  data,
}: {
  data: TLeadCallStatusStatisticRawData
}): JSX.Element => {
  const { t } = useTranslation('leads-list')

  const columns: { label: string; key: string }[] = [
    { label: t('view-lead-list.statistic.statusCode'), key: 'statusCode' },
    { label: t('view-lead-list.statistic.status'), key: 'status' },
    { label: t('view-lead-list.statistic.called'), key: 'called' },
    { label: t('view-lead-list.statistic.notCalled'), key: 'notCalled' },
  ]

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
          background: '#28587B',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {columns.map(({ label, key }) => (
          <div
            key={key}
            style={{
              flex: key === 'status' ? 2 : 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '8px',
              paddingRight: '16px',
            }}
          >
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ overflowY: 'scroll' }}>
        {data.data.map((item) => (
          <div
            key={item.statusCode}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderBottom: '1px solid #ccc',
            }}
          >
            {columns.map(({ key }) => (
              <div key={key} style={{ flex: key === 'status' ? 2 : 1, padding: '8px' }}>
                <InfoCell title={item[key as keyof typeof item]} />
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ccc',
          }}
        >
          <div style={{ flex: 1, padding: '8px' }}>
            <Text variant="f8" styles={{ lineHeight: '22px' }}>
              {t('view-lead-list.statistic.subtotals')}
            </Text>
          </div>
          <div style={{ flex: 2, padding: '8px' }} />
          <div style={{ flex: 1, padding: '8px', justifyItems: 'start' }}>
            <Text variant="f8" styles={{ lineHeight: '22px' }}>
              {data.subtotal.called}
            </Text>
          </div>
          <div style={{ flex: 1, padding: '8px', justifyItems: 'start' }}>
            <Text variant="f8" styles={{ lineHeight: '22px' }}>
              {data.subtotal.notCalled}
            </Text>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#f5f5f5',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            borderBottom: '1px solid #ccc',
          }}
        >
          <div style={{ flex: 1, padding: '8px' }}>
            <Text variant="f8" styles={{ lineHeight: '22px', fontWeight: 'bold' }}>
              {t('view-lead-list.statistic.total')}
            </Text>
          </div>
          <div style={{ flex: 1, padding: '8px', justifyItems: 'start' }}>
            <Text variant="f8" styles={{ lineHeight: '22px', fontWeight: 'bold' }}>
              {data.total}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
