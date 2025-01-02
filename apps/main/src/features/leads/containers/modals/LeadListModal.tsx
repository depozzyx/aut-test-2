import React from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import {
  TLeadCallStatusStatisticRawData,
  TLeadListData,
} from '@/api-rest/lead-list/types'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { useTheme } from 'styled-components'
import { LeadListCallStatisticTable } from './components/LeadListCallStatisticTable'

export const LeadListModal = ({
  leadListData,
  stats,
  onClose,
}: {
  leadListData: TLeadListData
  stats?: TLeadCallStatusStatisticRawData
  onClose: () => void
}): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const theme = useTheme()

  const { t: campaign } = useTranslation('campaigns')

  const { modalState, resetModals } = useModals()

  const onCloseModal = () => {
    resetModals()
    onClose()
  }

  const showModal =
    modalState?.modalName === MODAL_NAMES.VIEW_LEAD_LIST && modalState.isOpen

  const rows = [
    { name: t('view-lead-list.name'), value: leadListData.name },
    { name: t('view-lead-list.leadCount'), value: leadListData.leadCount },
    { name: t('view-lead-list.campaignName'), value: leadListData.campaignName },
    {
      name: t('view-lead-list.campaignStatus'),
      value:
        leadListData.campaignStatus &&
        campaign(`statuses.${leadListData.campaignStatus}`).toLowerCase(),
    },
    {
      name: t('view-lead-list.lastCallDate'),
      value: leadListData.lastCallDate && formatCreatedAt(leadListData.lastCallDate),
    },
  ]

  return (
    <ModalMessage
      title={t('view-lead-list.title')}
      open={showModal}
      onClose={onCloseModal}
      containerWidth="100%"
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        styles={{ marginTop: '40px', width: '100%' }}
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          styles={{
            width: '100%',
            maxWidth: '400px',
          }}
        >
          {rows.map((row) => (
            <Flex
              key={row.name}
              justify="start"
              styles={{
                display: 'flex',
                width: '100%',
                padding: '8px 0',
                borderBottom: `1px solid ${theme.palette.main22}`,
              }}
            >
              <Flex
                styles={{
                  flex: '1',
                  textAlign: 'start',
                }}
              >
                <Text variant="f8">{row.name}</Text>
              </Flex>
              <Flex
                styles={{
                  flex: '1',
                  textAlign: 'start',
                }}
              >
                <Text variant="f8">{row.value}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
        {stats && (
          <Flex styles={{ marginTop: '40px', width: '100%' }}>
            <LeadListCallStatisticTable data={stats} />
          </Flex>
        )}
      </Flex>
    </ModalMessage>
  )
}
