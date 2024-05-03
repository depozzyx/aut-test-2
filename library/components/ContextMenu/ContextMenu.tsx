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
  ...props
}) => {
  const [client, setClient] = useState(false)
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(!disableAutoFocus)

  const { breakpoint } = useResolution()
  const { stopScroll, containerRef } = useScrollLock()

  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    if (!fixScroll) return

    if (!open) {
      stopScroll(false)
      return
    }

    stopScroll(true)
  }, [open])

  // disable autofocus menu
  useEffect(() => {
    if (!disableAutoFocus) return

    if (open) {
      setTimeout(() => setShow(true), 0)
      return
    }

    setShow(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    setOpen(false)
  }, [breakpoint])

  useUnmount(() => {
    if (!open) return
    stopScroll(false)
  })

  if (!client) {
    if (!renderMenu) return null
    return typeof props.trigger === 'function' ? props.trigger(false) : <></>
  }

  const handleOnOpen = () => {
    setOpen(true)
    if (customOpenHandler) customOpenHandler()
  }

  const handleOnClose = () => {
    setOpen(false)
    if (customCloseHandler) customCloseHandler()
  }

  return (
    <StyledPopup
      {...props}
      open={open}
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
            {renderMenu({ onClose: () => setOpen(false), open })}
          </div>
        )}

        {!customMenu && (
          <Container
            containerStyles={containerStyles}
            ref={containerRef}
            tabIndex={0}
            style={{ display: show ? 'flex' : 'none' }}
            className="context-menu-container"
          >
            {renderMenu({ onClose: () => setOpen(false), open })}
          </Container>
        )}
      </>
    </StyledPopup>
  )
}
