import { useDispatch } from 'react-redux'
import { errorActions } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { agentStatusSelector } from '@/features/common/agentStatus/store'

export const useDisableClickOnCall = (): {
  showErrorMessage: () => void
  menuDisabled: boolean
} => {
  const { select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)
  const dispatch = useDispatch()

  const menuDisabled = pbxStatus.status === 'oncall' || pbxStatus.status === 'ringing'
  const showErrorMessage = () => {
    if (menuDisabled) {
      dispatch(
        errorActions.showGlobalError(
          'You are live now. ' +
            'Please finish your call to be able to navigate the system',
        ),
      )
    }
  }
  return { showErrorMessage, menuDisabled }
}
