import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Box } from '@peiko/components/Box'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/common/user'

export const AuthNavigation: FC = () => {
  const { t } = useTranslation('auth')
  const { user, logoutAsync } = useAuth()

  if (!user) {
    return (
      <Box styles={{ marginLeft: 'auto' }}>
        <FilledButton size="m" link={{ href: ROUTES.SIGN_UP }}>
          {t('btn-create-account')}
        </FilledButton>
        <OutlinedButton size="m" link={{ href: ROUTES.SIGN_IN }}>
          {t('btn-log-in')}
        </OutlinedButton>
      </Box>
    )
  }

  return (
    <FilledButton styles={{ marginLeft: 'auto' }} size="m" onClick={logoutAsync}>
      {t('btn-logout')}
    </FilledButton>
  )
}
