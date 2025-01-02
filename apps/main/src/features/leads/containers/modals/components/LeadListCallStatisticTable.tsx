import React from 'react'

import useTranslation from 'next-translate/useTranslation'
import { TLeadCallStatusStatisticRawData } from '@/api-rest/lead-list/types'
import { Text } from '@peiko/components/Text'
import { useTheme } from 'styled-components'

export const LeadListCallStatisticTable = ({
  data,
}: {
  data: TLeadCallStatusStatisticRawData
}): JSX.Element => {
  const { t } = useTranslation('leads-list')

  const theme = useTheme()

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
          background: theme.palette.main4,
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
              borderBottom: `1px solid ${theme.palette.main22}`,
            }}
          >
            {columns.map(({ key }) => (
              <div key={key} style={{ flex: key === 'status' ? 2 : 1, padding: '8px' }}>
                <Text>{item[key as keyof typeof item]}</Text>
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: `${theme.palette.base2}`,
            borderBottom: `1px solid ${theme.palette.main22}`,
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
            backgroundColor: `${theme.palette.base2}`,
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            borderBottom: `1px solid ${theme.palette.main22}`,
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
