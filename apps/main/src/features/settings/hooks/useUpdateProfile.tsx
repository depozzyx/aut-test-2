import { handleRestError } from '@/features/common/error'
import useNotifications from '@/features/common/notifications/hooks/use-notifications'
import { useAuth } from '@/features/common/user'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'
import { TUpdateUserReq } from '../../../api/rest/users/types'
import { apiUsers } from '../../../api/rest/users'

type TUpdateProfileArgs = {
  updateProfileAsync: (data: {
    formik: TFormik
    formData: Pick<TUpdateUserReq, 'username' | 'password'>
  }) => void
}

export const useUpdateProfile = (): TUpdateProfileArgs => {
  const { dispatch } = useRedux()
  const { getProfile, user } = useAuth()
  const { setNotification } = useNotifications()

  const updateProfileAsync: TUpdateProfileArgs['updateProfileAsync'] = async ({
    formData,
    formik,
  }) => {
    try {
      if (user?.role && user?.id) {
        await apiUsers.updateMe(formData)
      }
      getProfile()
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

  return { updateProfileAsync }
}
