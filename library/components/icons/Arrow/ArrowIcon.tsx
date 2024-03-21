import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const ArrowIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0004 14.8004C11.8004 14.8004 11.6004 14.7004 11.5004 14.6004L7.50039 10.6004C7.20039 10.3004 7.20039 9.80039 7.50039 9.50039C7.80039 9.20039 8.30039 9.20039 8.60039 9.50039L12.1004 13.0004L15.6004 9.50039C15.9004 9.20039 16.4004 9.20039 16.7004 9.50039C17.0004 9.80039 17.0004 10.3004 16.7004 10.6004L12.7004 14.6004C12.4004 14.7004 12.2004 14.8004 12.0004 14.8004Z"
        fill={color ? theme.palette[color] : theme.palette.main8}
      />
    </BaseIcon>
  )
}
