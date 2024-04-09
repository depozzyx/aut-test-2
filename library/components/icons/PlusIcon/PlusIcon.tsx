import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const PlusIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5998 6.6C12.5998 6.26863 12.3312 6 11.9998 6C11.6684 6 11.3998 6.26863 11.3998 6.6V11.3668H6.6C6.26863 11.3668 6 11.6354 6 11.9668C6 12.2981 6.26863 12.5668 6.6 12.5668H11.3998V17.4C11.3998 17.7314 11.6684 18 11.9998 18C12.3312 18 12.5998 17.7314 12.5998 17.4V12.5668H17.4C17.7314 12.5668 18 12.2981 18 11.9668C18 11.6354 17.7314 11.3668 17.4 11.3668H12.5998V6.6Z"
        fill={color ? theme.palette[color] : theme.palette.base}
      />
    </BaseIcon>
  )
}
