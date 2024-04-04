import { useRedux } from '@/hooks/use-redux'
import { TNotification } from '../types'
import { notificationActions, selectNotifications } from '../store'

type TNotificationReturn = {
  setNotification: ({ key, status, values }: TNotification) => void
  notification: TNotification | null
  resetNotifications: () => void
}

function useNotifications(): TNotificationReturn {
  const { select, dispatch } = useRedux()

  const setNotification = ({ key, status, values }: TNotification) => {
    dispatch(notificationActions.setNotification({ key, status, values }))
  }

  const resetNotifications = () => {
    dispatch(notificationActions.resetNotifications())
  }

  const { notification } = select(selectNotifications)

  return {
    notification,
    setNotification,
    resetNotifications,
  }
}

export default useNotifications
