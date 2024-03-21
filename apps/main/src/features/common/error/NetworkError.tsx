import { FC, useCallback, useEffect } from 'react'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { errorActions, errorselector } from './store'

export const NetworkError: FC = () => {
  const { t } = useTranslation('error')
  const { select, dispatch } = useRedux()
  const { networkError } = select(errorselector)

  const onClose = useCallback(() => {
    dispatch(errorActions.setNetworkError(false))
  }, [])

  const handleConnectionOnline = useCallback(() => {
    const webPing = setInterval(() => {
      fetch('//google.com', {
        mode: 'no-cors',
      })
        .then(() => {
          dispatch(errorActions.setNetworkError(false))
          clearInterval(webPing)
        })
        .catch(() => {
          console.warn('network error')
        })
    }, 2000)
  }, [])

  const handleConnectionOfLine = useCallback(() => {
    dispatch(errorActions.setNetworkError(true))
  }, [])

  useEffect(() => {
    window.addEventListener('online', handleConnectionOnline)
    window.addEventListener('offline', handleConnectionOfLine)
  }, [handleConnectionOnline, handleConnectionOfLine])

  useEffect(() => {
    if (networkError) handleConnectionOnline()
  }, [networkError, handleConnectionOnline])

  if (!networkError) return null

  return (
    <ModalMessage
      open={networkError}
      description={t('network-error-message')}
      onClose={onClose}
      status="error"
    />
  )
}
