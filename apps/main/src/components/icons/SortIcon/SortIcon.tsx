import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const SortIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* {direction === 'up' && ( */}
      {/*  <path */}
      {/*    d="M8 4L11 8H5L8 4Z" */}
      {/*    fill={color ? theme.palette[color] : theme.palette.base} */}
      {/*  /> */}
      {/* )} */}
      {/* {direction === 'down' && ( */}
      {/*  <path */}
      {/*    d="M8 12L5 8H11L8 12Z" */}
      {/*    fill={color ? theme.palette[color] : theme.palette.base} */}
      {/*  /> */}
      {/* )} */}

      <path
        d="M8.49994 3.88667L10.6133 6L11.5533 5.06L8.49994 2L5.43994 5.06L6.38661 6L8.49994 3.88667ZM8.49994 12.1133L6.38661 10L5.44661 10.94L8.49994 14L11.5599 10.94L10.6133 10L8.49994 12.1133Z"
        fill={color ? theme.palette[color] : theme.palette.base}
      />
    </BaseIcon>
  )
}
