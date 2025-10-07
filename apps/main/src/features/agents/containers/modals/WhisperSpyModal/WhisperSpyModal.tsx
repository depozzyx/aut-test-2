import React, { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { InfoColumn } from '@/components/InfoColumn'
import { TLeadData } from '@/api-rest/leads/types'
import { UserWithMicro } from '@peiko/components/icons/UserWithMicro'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { HeadphonesIcon } from '../../../../../components/icons/HeadphonesIcon/HeadphonesIcon'

export type WhisperSpyModalProps = {
  leadData?: TLeadData
  agentName: string
  agentExten: string
  mode?: 'whisper' | 'spy'
  onHangup: () => void
  allowHandUp?: boolean
}

export const WhisperSpyModal: React.FC<WhisperSpyModalProps> = ({
  leadData,
  agentName,
  agentExten,
  mode,
  onHangup,
  allowHandUp = false,
}) => {
  const { t } = useTranslation('agents')
  const { modalState, resetModals } = useModals()

  const open = modalState?.modalName === MODAL_NAMES.WHISPER_SPY && modalState.isOpen

  const close = () => {
    resetModals()
  }

  const hangup = () => {
    onHangup()
    resetModals()
  }

  useEffect(() => {
    if (open && !agentExten) {
      close()
    }
  }, [agentExten])

  return (
    <ModalMessage
      title={t(`whisper-spy.title.${mode}`, { agent: agentName, exten: agentExten })}
      open={open}
      onClose={close}
      containerWidth="680px"
    >
      <Flex direction="column" align="center" gap={16}>
        {mode === 'spy' && <HeadphonesIcon color="main" width="128px" height="128px" />}
        {mode === 'whisper' && (
          <UserWithMicro color="main" width="128px" height="128px" />
        )}
        {leadData ? (
          <Flex direction="column" gap={8}>
            <Flex gap={32} align="center">
              <InfoColumn title={t('whisper-spy.lead-info.name')} />
              <InfoColumn title={t('whisper-spy.lead-info.phone')} />
              {leadData.leadList?.campaign?.name && (
                <InfoColumn title={t('whisper-spy.lead-info.campaign')} />
              )}
            </Flex>
            <Flex gap={32} align="center">
              <InfoColumn title={leadData.name} />
              <InfoColumn title={leadData.phone} />
              {leadData.leadList?.campaign?.name && (
                <InfoColumn title={leadData.leadList?.campaign?.name} />
              )}
            </Flex>
          </Flex>
        ) : (
          <Text variant="f8" color="main9">
            {t('whisper-spy.no-lead')}
          </Text>
        )}

        <Flex justify="center" align="center" gap={12}>
          <FilledButton disabled={!allowHandUp} onClick={hangup} width="200px">
            {t('whisper-spy.hangup')}
          </FilledButton>
          <OutlinedButton onClick={close} width="200px">
            {t('whisper-spy.hide')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </ModalMessage>
  )
}
