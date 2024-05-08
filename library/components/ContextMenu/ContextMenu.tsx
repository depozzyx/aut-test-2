import React, { useEffect, useState } from 'react'
import { useUnmount } from 'react-use'
import { useResolution } from '@peiko/hooks/use-resolution'
import { useScrollLock } from '@peiko/hooks/use-scroll-lock'
import { Container, StyledPopup } from './ContextMenu.styles'
import { TContextMenu } from './types'

/**
 *
 * ContextMenu component use reactjs-popup internally
 *
 * `renderMenu`: function that returns the content of the contextMenu
 *
 * trigger: React element that will trigger the context menu
 *
 * all other props are passed to react-popup
 * [Learn more here](https://www.npmjs.com/package/reactjs-popup)
 */
export const ContextMenu: React.FC<TContextMenu> = ({
  renderMenu,
  fixScroll,
  customMenu,
  disableAutoFocus,
  zIndex = 99,
  contentStyle,
  withArrow = false,
  arrowStyle,
  customOpenHandler,
  customCloseHandler,
  containerStyles,
  open = false,
  ...props
}) => {
  const [client, setClient] = useState(false)
  const [isOpen, setIsOpen] = useState(open)
  const [show, setShow] = useState(!disableAutoFocus)

  const { breakpoint } = useResolution()
  const { stopScroll, containerRef } = useScrollLock()

  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    if (!fixScroll) return

    if (!isOpen) {
      stopScroll(false)
      return
    }

    stopScroll(true)
  }, [isOpen])

  // disable autofocus menu
  useEffect(() => {
    if (!disableAutoFocus) return

    if (isOpen) {
      setTimeout(() => setShow(true), 0)
      return
    }

    setShow(false)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (!open) setIsOpen(false)
  }, [breakpoint])

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useUnmount(() => {
    if (!isOpen) return
    stopScroll(false)
  })

  if (!client) {
    if (!renderMenu) return null
    return typeof props.trigger === 'function' ? props.trigger(false) : <></>
  }

  const handleOnOpen = () => {
    setIsOpen(true)
    if (customOpenHandler) customOpenHandler()
  }

  const handleOnClose = () => {
    setIsOpen(false)
    if (customCloseHandler) customCloseHandler()
  }

  return (
    <StyledPopup
      {...props}
      open={isOpen}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      contentStyle={{ ...contentStyle, zIndex }}
      arrow={withArrow}
      arrowStyle={arrowStyle}
    >
      <>
        {customMenu && (
          <div
            className="custom-menu"
            ref={containerRef}
            style={{ display: show ? 'flex' : 'none' }}
          >
            {renderMenu({ onClose: () => setIsOpen(false), open: isOpen })}
          </div>
        )}

        {!customMenu && (
          <Container
            ref={containerRef}
            tabIndex={0}
            containerStyles={containerStyles}
            style={{ display: show ? 'flex' : 'none' }}
            className="context-menu-container"
          >
            {renderMenu({ onClose: () => setIsOpen(false), open: isOpen })}
          </Container>
        )}
      </>
    </StyledPopup>
  )
}
