import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { AuthLayout } from '@/layout/AuthLayout'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'
import { Message } from '@/features/auth/components/Message'
import { ROUTES } from '@/constants/routes'

const LogoutPage: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('auth')

  const handleLogout = () => router.push(ROUTES.SIGN_IN)

  return (
    <PermissionAuth>
      <AuthLayout>
        <Message
          status="success"
          message={t('logout')}
          buttonText={t('sign-in.action')}
          buttonAction={handleLogout}
          onClose={handleLogout}
        />
      </AuthLayout>
    </PermissionAuth>
  )
}
export default LogoutPage
