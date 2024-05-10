import { managerApi } from '@/api-rest/manager'
import { TUpdateManagerReq } from '@/api-rest/manager/types'
import { handleRestError } from '@/features/common/error'
import useNotifications from '@/features/common/notifications/hooks/use-notifications'
import { useAuth } from '@/features/common/user'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'

type TUpdateProfileArgs = {
  updateProfileAsync: (data: { formik: TFormik; formData: TUpdateManagerReq }) => void
}

export const useUpdateProfile = (): TUpdateProfileArgs => {
  const { dispatch } = useRedux()
  const { getProfile } = useAuth()
  const { setNotification } = useNotifications()

  const updateProfileAsync: TUpdateProfileArgs['updateProfileAsync'] = async ({
    formData,
    formik,
  }) => {
    try {
      await managerApi.updateManager(formData)
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
