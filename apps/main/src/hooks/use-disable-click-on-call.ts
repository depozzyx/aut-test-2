import { useDispatch } from 'react-redux'
import { errorActions } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { agentStatusSelector } from '@/features/common/agentStatus/store'
// import { notificationActions } from '@/features/common/notifications/store'

export const useDisableClickOnCall = (): {
  showErrorMessage: () => void
  menuDisabled: boolean
  sidebarDisabled: boolean
} => {
  const { select } = useRedux()
  const { pbxStatus, hasCurrentRTCSession } = select(agentStatusSelector)
  const dispatch = useDispatch()

  const menuDisabled = pbxStatus.status === 'oncall' || pbxStatus.status === 'ringing'

  const sidebarDisabled = pbxStatus.status !== 'offline' || hasCurrentRTCSession

  const showGlobalError = (msg: string) => dispatch(errorActions.showGlobalError(msg))

  const showErrorMessage = () => {
    if (menuDisabled) {
      return showGlobalError(
        'You are live now. Please finish your call to be able to navigate the system',
      )
    }
    if (sidebarDisabled) {
      showGlobalError(
        `You are live now. Please ${
          hasCurrentRTCSession ? 'finish echo test' : 'set offline mode'
        } to navigate the system`,
      )
    }
  }
  return { showErrorMessage, menuDisabled, sidebarDisabled }
}
