import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const ArrowIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9042 3.14159L13.4292 1.66658L5.09584 9.99992L13.4292 18.3333L14.9042 16.8583L8.04584 9.99992L14.9042 3.14159Z"
        fill={color ? theme.palette[color] : theme.palette.main22}
      />
    </BaseIcon>
  )
}
