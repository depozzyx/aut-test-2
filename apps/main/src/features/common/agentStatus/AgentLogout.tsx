import React, { FC, useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { InfoIcon } from '@peiko/components/icons/InfoIcon'
import { Box } from '@peiko/components/Box'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useRedux } from '@/hooks/use-redux'
import { setSelectedCampaignId } from '@/features/agents/store/agents'
import { MODAL_NAMES } from '../modals/constants'
import { useModals } from '../modals/hooks/use-modals'
import { agentActions, agentStatusSelector } from './store'
import { useAuth } from '../user'

export const AgentLogout: FC = () => {
  const { t } = useTranslation('user')
  const { modalState, resetModals } = useModals()
  const { dispatch, select } = useRedux()
  const { loading, pbxStatus } = select(agentStatusSelector)
  const { logoutAsync } = useAuth()

  const showModal =
    modalState?.modalName === MODAL_NAMES.AGENT_LOGOUT && modalState.isOpen

  const logoutHandler = () => {
    const logout = () => {
      // if (rtcSession) { // todo
      //
      // }
      logoutAsync()
      resetModals()
    }
    if (pbxStatus.status !== 'offline') {
      dispatch(agentActions.setStatusAsync('finish', undefined, logout))
      dispatch(setSelectedCampaignId(null))
      dispatch(agentActions.setSipCanConnect(false))
    } else logout()
  }

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (!(pbxStatus.status === 'offline')) {
        e.preventDefault()
        return ''
      }
    },
    [pbxStatus.status],
  )

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  return (
    <ModalMessage
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="582px"
      cardProps={{ xs: { padding: '32px 37px', borderRadius: '8px' } }}
    >
      <Box styles={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <InfoIcon size="xl" />
        <Text
          variant="f2"
          styles={{ textAlign: 'center', marginTop: '40px', marginBottom: '48px' }}
        >
          {t('agentLogout.text')}
        </Text>
        <Box
          styles={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            width: '100%',
            gap: '24px',
          }}
        >
          <OutlinedButton width="100%" onClick={resetModals}>
            {t('agentLogout.cancel')}
          </OutlinedButton>
          <FilledButton onClick={logoutHandler} width="100%" isLoading={loading}>
            {t('agentLogout.agree')}
          </FilledButton>
        </Box>
      </Box>
    </ModalMessage>
  )
}
