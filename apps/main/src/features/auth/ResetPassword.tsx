import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUnmount } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { ROUTES } from '@/routes'
import { Message } from './components/Message'
import { reset, selectResetPassword, setToken } from './store/reset-password'
import { ResetPasswordForm } from './containers/ResetPasswordForm'

export const ResetPassword: FC = () => {
  const router = useRouter()
  const { t } = useTranslation('auth')
  const { select, dispatch } = useRedux()
  const { step } = select(selectResetPassword)

  useEffect(() => {
    const { token } = router.query
    if (typeof token !== 'string') return
    dispatch(setToken(token))
  }, [])

  useUnmount(() => dispatch(reset()))

  const handleResetError = () => {
    router.push(ROUTES.FORGOT_PASSWORD)
  }

  const handleResetSuccess = () => {
    router.push(ROUTES.SIGN_IN)
  }

  switch (step) {
    case null:
      return <ResetPasswordForm />
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
