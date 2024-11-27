import { handleRestError } from '@/features/common/error'
import useNotifications from '@/features/common/notifications/hooks/use-notifications'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'
import { apiSettings } from '@/api-rest/settings'
import { TSetting, TSettingReq, TSettings } from '@/api-rest/settings/types'

type TSettingsArgs = {
  changeSettingAsync: (data: {
    formik: TFormik
    formData: TSettingReq
    key: string
  }) => void
  changeSettingsAsync: (data: { formik: TFormik; formData: TSettings }) => Promise<void>
  getSettingAsync: (key: string) => Promise<TSetting>
  getSettingsAsync: (keys: string[]) => Promise<TSettings>
}

export const useSettings = (): TSettingsArgs => {
  const { dispatch } = useRedux()
  const { setNotification } = useNotifications()

  const changeSettingAsync: TSettingsArgs['changeSettingAsync'] = async ({
    key,
    formData,
    formik,
  }) => {
    try {
      await apiSettings.upsert(key, formData)
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

  const changeSettingsAsync: TSettingsArgs['changeSettingsAsync'] = async ({
    formData,
    formik,
  }) => {
    try {
      await apiSettings.upsertMany(formData)
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

  const getSettingAsync = async (key: string): Promise<TSetting> => {
    const { data } = await apiSettings.get(key)
    return data.data
  }

  const getSettingsAsync = async (keys: string[]): Promise<TSettings> => {
    const { data } = await apiSettings.list(keys)
    return data.data
  }

  return { changeSettingAsync, changeSettingsAsync, getSettingAsync, getSettingsAsync }
}
