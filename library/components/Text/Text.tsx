import type { PopupPosition } from 'reactjs-popup/dist/types'

import React from 'react'
import { Tooltip } from '@peiko/components/Tooltip'
import { InfoIcon } from '@peiko/components/icons/InfoIcon'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { StyledText } from './Text.styles'
import { TText } from './types'

export const Text = React.forwardRef<
  HTMLElement,
  TText & {
    showTooltip?: boolean
    tooltipText?: string
    customTooltipTextComponent?: JSX.Element
    tooltipPosition?: PopupPosition
    iconType?: 'info' | 'error'
  }
>((props, ref) => {
  const {
    tag = 'p',
    children,
    showTooltip = false,
    tooltipText,
    customTooltipTextComponent,
    tooltipPosition = 'top right',
    iconType = 'info',
    ...otherProps
  } = props

  const getTooltipIcon = () =>
    iconType === 'error' ? (
      <ErrorIcon width="16px" height="16px" />
    ) : (
      <InfoIcon width="16px" height="16px" />
    )

  const textElement = (
    <StyledText as={tag} ref={ref} {...otherProps}>
      {children}
    </StyledText>
  )

  if (!children) return null

  return showTooltip ? (
    <Tooltip
      on={['hover', 'focus']}
      position={tooltipPosition}
      mouseEnterDelay={300}
      keepTooltipInside
      contentBorderColor="main2"
      arrowBorderColor="main2"
      trigger={<span style={{ display: 'inline-block' }}>{textElement}</span>}
      renderMenu={() => (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {getTooltipIcon()}
          {customTooltipTextComponent || <span>{tooltipText}</span>}
        </span>
      )}
    />
  ) : (
    textElement
  )
})

Text.displayName = 'Text'
