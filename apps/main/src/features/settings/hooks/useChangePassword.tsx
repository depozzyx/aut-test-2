import { apiAuth } from '@/api-rest/auth'
import { TResetPasswordReq } from '@/api-rest/auth/types'
import { handleRestError } from '@/features/common/error'
import useNotifications from '@/features/common/notifications/hooks/use-notifications'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'

type TChangePasswordArgs = {
  changePasswordAsync: (data: { formik: TFormik; formData: TResetPasswordReq }) => void
}

export const useChangePassword = (): TChangePasswordArgs => {
  const { dispatch } = useRedux()
  const { setNotification } = useNotifications()

  const changePasswordAsync: TChangePasswordArgs['changePasswordAsync'] = async ({
    formData,
    formik,
  }) => {
    try {
      await apiAuth.resetPassword(formData)
      setNotification({
        key: 'notifications:settings.user-data-changed',
        status: 'success',
        values: {},
      })
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      formik.setSubmitting(false)
    }
  }

  return { changePasswordAsync }
}
