import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@peiko/components/loaders/Loader'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import useTranslation from 'next-translate/useTranslation'
import { Box } from '@peiko/components/Box'
import { ROUTES } from '@/constants/routes'
import { authorized } from '@/browser-api/authorized'
import { useTelegram } from './hooks/useTelegram'

export const Confirmation: React.FC = () => {
  const { t } = useTranslation('auth')

  const router = useRouter()

  const { fetching, error, logIn } = useTelegram()

  useEffect(() => {
    if (router.query.key && !authorized.get()) {
      logIn({ key: String(router.query.key) })
    }
  }, [router.query.key])

  if (fetching) {
    return <Loader width="32px" height="32px" styles={{ margin: '0 auto' }} />
  }

  return (
    <>
      {error && (
        <Box styles={{ margin: '0 auto' }}>
          <OutlinedButton size="m" link={{ href: ROUTES.SIGN_UP }}>
            {t('btn-create-account')}
          </OutlinedButton>
          <OutlinedButton size="m" link={{ href: ROUTES.SIGN_IN }}>
            {t('btn-log-in')}
          </OutlinedButton>
        </Box>
      )}
    </>
  )
}
