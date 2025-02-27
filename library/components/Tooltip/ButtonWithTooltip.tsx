import React from 'react'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { InfoIcon } from '@peiko/components/icons/InfoIcon'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { PopupPosition } from 'reactjs-popup/dist/types'
import { Tooltip } from './Tooltip'

interface Props {
  showTooltip: boolean
  buttonDisabled?: boolean
  onClick: () => void
  tooltipText?: string
  customTooltipTextComponent?: JSX.Element
  tooltipPosition?: PopupPosition
  iconType?: 'info' | 'error'
  buttonType: 'edit' | 'delete' | 'view'
}

export const ButtonWithTooltip: React.FC<Props> = ({
  showTooltip,
  buttonDisabled = false,
  onClick,
  tooltipText,
  customTooltipTextComponent,
  tooltipPosition = 'top right',
  iconType = 'info',
  buttonType,
}) => {
  const buttonMap = {
    edit: (
      <IconButton onClick={onClick} iconColor="transparent" disabled={buttonDisabled}>
        <EditIcon width="24px" height="24px" />
      </IconButton>
    ),
    delete: (
      <IconButton onClick={onClick} iconColor="main13" disabled={buttonDisabled}>
        <TrashIcon width="24px" height="24px" />
      </IconButton>
    ),
    view: (
      <IconButton onClick={onClick} iconColor="main3" disabled={buttonDisabled}>
        <EyeIcon width="24px" height="24px" />
      </IconButton>
    ),
  }

  const getTooltipIcon = () =>
    iconType === 'error' ? (
      <ErrorIcon width="16px" height="16px" />
    ) : (
      <InfoIcon width="16px" height="16px" />
    )

  const button = buttonMap[buttonType]

  return showTooltip ? (
    <Tooltip
      on={['hover', 'focus']}
      position={tooltipPosition}
      keepTooltipInside
      contentBorderColor="main2"
      arrowBorderColor="main2"
      trigger={<span style={{ display: 'inline-block' }}>{button}</span>}
      renderMenu={() => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getTooltipIcon()}
          {customTooltipTextComponent || <span>{tooltipText}</span>}
        </span>
      )}
    />
  ) : (
    button
  )
}
