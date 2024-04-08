import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const SearchIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.41382 2.3835C4.74423 0.0943747 8.52256 0.0943747 10.853 2.3835C13.1047 4.59531 13.1807 8.13494 11.0811 10.4365L13.5692 12.8807C13.6217 12.9323 13.6225 13.0168 13.5709 13.0693C13.5703 13.0698 13.5698 13.0704 13.5692 13.071L13.0562 13.5749C13.0043 13.6258 12.9212 13.6258 12.8693 13.5749L10.3585 11.1083C8.01553 12.9517 4.5858 12.8067 2.41382 10.6732C0.0834141 8.38404 0.0834141 4.67263 2.41382 2.3835ZM3.11708 3.07431C1.17508 4.98191 1.17508 8.07475 3.11708 9.98236C5.05909 11.89 8.2077 11.89 10.1497 9.98236C12.0917 8.07475 12.0917 4.98191 10.1497 3.07431C8.2077 1.1667 5.05909 1.1667 3.11708 3.07431Z"
        fill={color ? theme.palette[color] : theme.palette.main22}
      />
    </BaseIcon>
  )
}
