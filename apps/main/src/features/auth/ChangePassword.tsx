import { FC } from 'react'
import { useRouter } from 'next/router'
import { useUnmount } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { ChangePasswordForm } from '@/features/auth/containers/ChangePasswordForm/ChangePasswordForm'
import { reset, selectChangePassword } from '@/features/auth/store/change-password'
import { Message } from '@/features/auth/components/Message'
import { ROUTES } from '@/routes'

export const ChangePassword: FC = () => {
  const router = useRouter()
  const { t } = useTranslation('auth')
  const { select, dispatch } = useRedux()
  const { step } = select(selectChangePassword)

  useUnmount(() => dispatch(reset()))

  const handleResetError = () => {
    router.push(ROUTES.RESET_PASSWORD)
  }

  const handleResetSuccess = () => {
    router.push(ROUTES.SIGN_IN)
  }

  switch (step) {
    case null:
      return <ChangePasswordForm />
    case 'success':
      return (
        <Message
          status="success"
          message={t('reset-success')}
          buttonText={t('sign-in.action')}
          buttonAction={handleResetSuccess}
          onClose={handleResetSuccess}
        />
      )
    case 'error':
      return (
        <Message
          status="error"
          message={t('reset-error')}
          buttonText={t('reset-password-link')}
          buttonAction={handleResetError}
          onClose={handleResetError}
        />
      )
    default:
      return <></>
  }
}
