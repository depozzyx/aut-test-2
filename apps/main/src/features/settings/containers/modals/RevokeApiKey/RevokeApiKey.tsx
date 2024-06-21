import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { revokeApiKey } from '@/features/settings/store/api-key'

export const RevokeApiKey = (): JSX.Element => {
  const { t } = useTranslation('api-key')
  const { dispatch } = useRedux()
  const { resetModals } = useModals()

  const handleRevoke = () => {
    dispatch(revokeApiKey())
  }

  const title = (
    <Flex align="center" justify="center" width="330px" styles={{ textAlign: 'center' }}>
      <Text>{t('revoke-api-key.title')}</Text>
    </Flex>
  )

  const actions = (
    <Flex width="100%" gap={24} styles={{ paddingTop: '48px' }}>
      <FilledButton onClick={handleRevoke} width="100%">
        {t('revoke-api-key.revoke')}
      </FilledButton>
      <OutlinedButton onClick={resetModals} width="100%">
        {t('revoke-api-key.cancel')}
      </OutlinedButton>
    </Flex>
  )

  return (
    <ModalMessage
      open
      title={title}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
      status="info"
    >
      {actions}
    </ModalMessage>
  )
}
