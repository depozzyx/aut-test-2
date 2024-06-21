import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useRedux } from '@/hooks/use-redux'
import { selectCreatedApiKey } from '@/features/settings/store/api-key'
import { Copy } from '@peiko/components/inputs/Input/components/Copy'

export const ConfirmNewApiKey = (): JSX.Element => {
  const { t } = useTranslation('api-key')
  const { select } = useRedux()
  const { resetModals } = useModals()

  const createdApiKey = select(selectCreatedApiKey, shallowEqual)

  const title = (
    <Flex align="center" justify="center" width="330px" styles={{ textAlign: 'center' }}>
      <Text>{t('confirm-new-api-key.title')}</Text>
    </Flex>
  )

  const content = (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap={6} padding="40px 40px 0">
        <Text>{t('confirm-new-api-key.field-label')}</Text>
        <Flex
          justify="space-between"
          align="center"
          height="30px"
          bgColor="overlay"
          padding="0 4px 0 16px"
          borderRadius={6}
        >
          <Text variant="f8" color="main5">
            {createdApiKey?.key}
          </Text>
          <Copy value={createdApiKey?.key as string} size="m" />
        </Flex>
      </Flex>
      <Flex
        width="100%"
        gap={24}
        styles={{ paddingTop: '48px' }}
        align="center"
        justify="center"
      >
        <FilledButton onClick={resetModals} size="m" maxWidth="236px" width="100%">
          {t('confirm-new-api-key.done')}
        </FilledButton>
      </Flex>
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
      {content}
    </ModalMessage>
  )
}
