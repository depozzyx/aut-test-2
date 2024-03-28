import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const EmailIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="ic:outline-email">
        <path
          id="Vector"
          d="M20 7.6C20 6.72 19.28 6 18.4 6H5.6C4.72 6 4 6.72 4 7.6V17.2C4 18.08 4.72 18.8 5.6 18.8H18.4C19.28 18.8 20 18.08 20 17.2V7.6ZM18.4 7.6L12 11.6L5.6 7.6H18.4ZM18.4 17.2H5.6V9.2L12 13.2L18.4 9.2V17.2Z"
          fill={color ? theme.palette[color] : theme.palette.main3}
        />
      </g>
    </BaseIcon>
  )
}
