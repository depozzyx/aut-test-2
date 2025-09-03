import React, { useEffect, useState } from 'react'
import * as S from './Tooltip.styles'
import { TTooltipProps } from './types'

/**
 *
 * Tooltip component use reactjs-popup internally
 *
 * renderMenu: function that returns the content of the tooltip
 *
 * trigger: element that will trigger the tooltip
 *
 * all other props are passed to react-popup
 * [Learn more here](https://www.npmjs.com/package/reactjs-popup)
 */
export const Tooltip: React.FC<TTooltipProps> = ({
  renderMenu,
  className,
  trigger,
  zIndex,
  liveTime,
  onOpen,
  ...props
}) => {
  const [client, setClient] = useState(false)
  const [open, setOpen] = useState(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    if (open && liveTime) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setOpen(false), liveTime)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [open, liveTime])

  if (!client) {
    if (!trigger) return null
    return typeof trigger === 'function' ? trigger(false) : trigger
  }

  return (
    <S.Tooltip
      trigger={trigger}
      open={open}
      onOpen={() => {
        setOpen(true)
        if (onOpen) onOpen()
      }}
      onClose={() => setOpen(false)}
      contentStyle={{ zIndex: zIndex ?? 10 }}
      {...props}
    >
      <>
        {renderMenu && (
          <S.Menu className={className}>
            {renderMenu({ onClose: () => setOpen(false) })}
          </S.Menu>
        )}
      </>
    </S.Tooltip>
  )
}
