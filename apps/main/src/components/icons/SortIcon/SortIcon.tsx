import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'
import { ORDER } from '@/constants/order'
import { TOrder } from '@/types/entities/order'

type TSort = {
  order?: TOrder
}

export const SortIcon: React.FC<TIcon & TSort> = ({ color, order, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {order === ORDER.ASC && (
        <path
          d="M8.49994 3.88667L10.6133 6L11.5533 5.06L8.49994 2L5.43994 5.06L6.38661 6L8.49994 3.88667Z"
          fill={color ? theme.palette[color] : theme.palette.base}
        />
        // <path
        //   d="M8 5L11 10H5L8 5Z"
        //   fill={color ? theme.palette[color] : theme.palette.base}
        // />
      )}
      {order === ORDER.DESC && (
        <path
          d="M8.49994 12.1133L6.38661 10L5.44661 10.94L8.49994 14L11.5599 10.94L10.6133 10L8.49994 12.1133Z"
          fill={color ? theme.palette[color] : theme.palette.base}
        />
        // <path
        //   d="M8 13L5 8H11L8 13Z"
        //   fill={color ? theme.palette[color] : theme.palette.base}
        // />
      )}

      {!order && (
        <path
          d="M8.49994 3.88667L10.6133 6L11.5533 5.06L8.49994 2L5.43994 5.06L6.38661 6L8.49994 3.88667ZM8.49994 12.1133L6.38661 10L5.44661 10.94L8.49994 14L11.5599 10.94L10.6133 10L8.49994 12.1133Z"
          fill={color ? theme.palette[color] : theme.palette.base}
        />
      )}
    </BaseIcon>
  )
}
