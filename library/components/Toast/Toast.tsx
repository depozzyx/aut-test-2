import { Id, toast } from 'react-toastify'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef } from 'react'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Container, ContentContainer } from './Toast.styles'
import { TToastProps } from './types'

export const Toast: React.FC<TToastProps> = ({
  id,
  open,
  undoFn,
  children,
  ...options
}) => {
  const { t } = useTranslation('toast')
  const toastRef = useRef<Id | null>(null)

  const openToast = () => {
    toastRef.current = toast(
      <ContentContainer>
        {children}
        {undoFn && (
          <FilledButton size="s" onClick={undoFn}>
            {t('undo')}
          </FilledButton>
        )}
      </ContentContainer>,
      {
        ...options,
        toastId: id,
        type: 'default',
      },
    )
  }

  useEffect(() => {
    if (open) {
      openToast()
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current)
    }

    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current)
      }
    }
  }, [open])

  return <Container />
}
