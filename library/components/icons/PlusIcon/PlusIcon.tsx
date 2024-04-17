import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const PlusIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5998 6.6C12.5998 6.26863 12.3312 6 11.9998 6C11.6684 6 11.3998 6.26863 11.3998 6.6V11.3668H6.6C6.26863 11.3668 6 11.6354 6 11.9668C6 12.2981 6.26863 12.5668 6.6 12.5668H11.3998V17.4C11.3998 17.7314 11.6684 18 11.9998 18C12.3312 18 12.5998 17.7314 12.5998 17.4V12.5668H17.4C17.7314 12.5668 18 12.2981 18 11.9668C18 11.6354 17.7314 11.3668 17.4 11.3668H12.5998V6.6Z"
        fill={color ? theme.palette[color] : theme.palette.base}
      /> */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.4 1C8.731 1 9 1.269 9 1.6V7H14.4C14.731 7 15 7.269 15 7.6V8.4C15 8.731 14.731 9 14.4 9H9V14.4C9 14.731 8.731 15 8.4 15H7.6C7.269 15 7 14.731 7 14.4V9H1.6C1.269 9 1 8.731 1 8.4V7.6C1 7.269 1.269 7 1.6 7H7V1.6C7 1.269 7.269 1 7.6 1H8.4V1Z"
        fill={theme.palette[color ?? 'main']}
      />
    </BaseIcon>
  )
}
