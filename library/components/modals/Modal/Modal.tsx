import { useEffect, useRef, useState, memo } from 'react'
import { useClickAway, useUnmount } from 'react-use'
import { deepEqual } from '@peiko/utils/deep-equal'
import { useScrollLock } from '@peiko/hooks/use-scroll-lock'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import * as S from './Modal.styles'
import { TModalProps } from './types'

/** Modal component is basic Popup
 *
 * Modal doesn't responsible for content of the modal
 *
 * You may pass any children you want to show in the modal
 *
 * Consider Card or Box components for modal content cause they can be easily styles
 */

export const Modal = memo(
  ({
    open,
    onClose,
    children,
    disableCloseOutside,
    maxWidth,
    containerWidth,
    hideCloseButton,
  }: TModalProps): JSX.Element | null => {
    const [isClient, setIsClient] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { stopScroll, setContainerElem } = useScrollLock()

    useEffect(() => setIsClient(true), [])

    useClickAway(containerRef, (event) => {
      const ignore = event.composedPath().some((item) => {
        if (!(item instanceof HTMLElement)) return false

        return item.className.includes('multi-rs__clear-indicator')
      })

      if (disableCloseOutside || ignore) return
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
      <S.Popup
        modal
        nested
        open={open}
        onClose={onClose}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <S.Container
          ref={containerRef}
          tabIndex={0}
          containerWidth={containerWidth}
          maxWidth={maxWidth}
        >
          {onClose && !hideCloseButton && (
            <S.Close onClick={onClose} iconColor="main5" size="s">
              <CloseIcon />
            </S.Close>
          )}
          {children}
        </S.Container>
      </S.Popup>
    )
  },
  deepEqual,
)

Modal.displayName = 'Modal'
