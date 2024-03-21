import useTranslation from 'next-translate/useTranslation'

import { Card } from '@peiko/components/Card'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { TextButton } from '@peiko/components/buttons/TextButton'
import { ROUTES } from '@/constants/routes'
import { AuthButtons } from './components/AuthButtons'

export const SignIn: React.FC = () => {
  const { t } = useTranslation('auth')

  const buttons = [
    {
      text: t('btn-sign-in-number'),
      action: null,
    },
    {
      text: t('btn-sign-in-google'),
      action: null,
    },
    {
      text: t('btn-sign-in-apple'),
      action: null,
    },
    {
      text: t('btn-sign-in-whatsApp'),
      action: null,
    },
  ]

  return (
    <Card styles={{ width: '100%', maxWidth: '516px', margin: '0 auto' }}>
      <Box styles={{ width: '100%', maxWidth: '404px', margin: '0 auto' }}>
        <Text styles={{ marginBottom: '16px' }}>{t('welcome-back')}</Text>
        <FilledButton
          link={{ href: 'http://t.me/goldevrobot?start=login_investor' }}
          size="m"
          width="100%"
          maxWidth="404px"
        >
          {t('btn-sign-in-telegram')}
        </FilledButton>
        <AuthButtons buttons={buttons} />
        <Box styles={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text>{t('dont-have-account')}</Text>
          <TextButton link={{ href: ROUTES.SIGN_UP }}>{t('create-account')}</TextButton>
        </Box>
      </Box>
    </Card>
  )
}
