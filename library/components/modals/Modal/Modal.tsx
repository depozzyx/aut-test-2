import { useEffect, useRef, useState } from 'react'
import { useClickAway, useUnmount } from 'react-use'
import { useScrollLock } from '@peiko/hooks/use-scroll-lock'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import * as S from './Modal.styles'
import { TModalProps } from './types'

/** Modal component is basic Popup
 *
 * Modal doesnt responsible for content of the modal
 *
 * You may pass any children you want to show in the modal
 *
 * Consider Card or Box components for modal content cause they can be easily styled
 */
export const Modal: React.FC<TModalProps> = ({
  open,
  onClose,
  children,
  disableCloseOutside,
  maxWidth,
  hideCloseButton,
}) => {
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { stopScroll, setContainerElem } = useScrollLock()

  useEffect(() => setIsClient(true), [])

  useClickAway(containerRef, () => {
    if (disableCloseOutside) return
    onClose?.()
  })

  useEffect(() => {
    if (!open) {
      stopScroll(false)
      return
    }
    setTimeout(() => {
      setContainerElem(document.querySelector('.popup-overlay'))
      stopScroll(true)
    }, 1)
  }, [open])

  useUnmount(() => {
    if (!open) return
    stopScroll(false)
  })

  if (!isClient) return null

  return (
    <S.Popup modal nested open={open} onClose={onClose} closeOnDocumentClick={false}>
      <S.Container ref={containerRef} tabIndex={0} maxWidth={maxWidth}>
        {onClose && !hideCloseButton && (
          <S.Close onClick={onClose}>
            <CloseIcon />
          </S.Close>
        )}
        {children}
      </S.Container>
    </S.Popup>
  )
}
