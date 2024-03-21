import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { errorActions, errorselector } from './store'

export const GlobalError: React.FC = () => {
  const { t } = useTranslation('error')
  const { select, dispatch } = useRedux()
  const { globalError } = select(errorselector)

  const { message, hasError } = globalError

  const onClose = () => {
    dispatch(errorActions.hideGlobalError())
  }

  const description =
    typeof message === 'string' && message !== '' ? message : t('default-message')

  return (
    <ModalMessage
      open={hasError}
      description={description}
      onClose={onClose}
      status="error"
    />
  )
}
