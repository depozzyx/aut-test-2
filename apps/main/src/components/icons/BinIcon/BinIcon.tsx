import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const BinIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.66667 20C7.17778 20 6.75941 19.8261 6.41156 19.4782C6.0637 19.1304 5.88948 18.7117 5.88889 18.2222V6.66667H5V4.88889H9.44444V4H14.7778V4.88889H19.2222V6.66667H18.3333V18.2222C18.3333 18.7111 18.1594 19.1298 17.8116 19.4782C17.4637 19.8267 17.045 20.0006 16.5556 20H7.66667ZM16.5556 6.66667H7.66667V18.2222H16.5556V6.66667ZM9.44444 16.4444H11.2222V8.44444H9.44444V16.4444ZM13 16.4444H14.7778V8.44444H13V16.4444Z"
        fill={theme.palette[color ?? 'main13']}
      />
    </BaseIcon>
  )
}
