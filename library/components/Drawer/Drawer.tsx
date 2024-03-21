import { useUnmount } from 'react-use'
import { useEffect } from 'react'
import { useScrollLock } from '@peiko/hooks/use-scroll-lock'
import { useClickEscape } from '@peiko/hooks/use-click-escape'
import { DRAWER_PORTAL_ID } from '@peiko/constants/id'
import { Portal } from '@peiko/components/Portal'
import { TDrawerProps } from './types'
import { DrawerContainer, Backdrop } from './Drawer.styles'

// TODO: add logic like in tooltip with button
export const Drawer: React.FC<TDrawerProps> = ({
  open = false,
  position = 'left',
  onClose,
  children,
  lockScroll = true,
  fullScreen = false,
  hideBackdrop = false,
  disableAnimation = false,
}) => {
  const { stopScroll, containerRef } = useScrollLock()

  useEffect(() => {
    if (!lockScroll) return

    if (!open) {
      stopScroll(false)
      return
    }

    stopScroll(true)
  }, [open])

  useUnmount(() => {
    if (!lockScroll) return
    if (!open) return
    stopScroll(false)
  })

  useClickEscape(open, onClose)

  return (
    <Portal portalId={DRAWER_PORTAL_ID}>
      <>
        {!hideBackdrop && <Backdrop open={open} onClick={onClose} />}
        <DrawerContainer
          ref={containerRef}
          open={open}
          position={position}
          role="presentation"
          fullScreen={fullScreen}
          disableAnimation={disableAnimation}
        >
          {children}
        </DrawerContainer>
      </>
    </Portal>
  )
}
