import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { errorActions, errorselector } from './store'

export const SocketError: React.FC = () => {
  const { t } = useTranslation('error')
  const { select, dispatch } = useRedux()
  const { socketError } = select(errorselector)

  const onClose = () => {
    dispatch(errorActions.setSocketError(false))
  }

  return (
    <ModalMessage
      open={socketError}
      description={t('socket-connection')}
      onClose={onClose}
      status="error"
    />
  )
}
