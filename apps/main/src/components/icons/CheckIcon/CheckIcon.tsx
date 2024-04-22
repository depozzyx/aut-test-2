import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const CheckIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.96664 12.8694C6.85768 12.7632 6.71357 12.7054 6.56465 12.7082C6.41574 12.7109 6.27367 12.774 6.16835 12.8841C6.06304 12.9942 6.00272 13.1427 6.00009 13.2984C5.99746 13.4541 6.05274 13.6048 6.15427 13.7187L9.60304 17.3243C9.71081 17.4368 9.8569 17.5 10.0092 17.5C10.1615 17.5 10.3076 17.4368 10.4154 17.3243L14.6306 12.9174L18.8457 8.5106C18.9473 8.39668 19.0025 8.24601 18.9999 8.09033C18.9973 7.93465 18.937 7.78611 18.8316 7.67601C18.7263 7.56591 18.5843 7.50284 18.4353 7.50009C18.2864 7.49735 18.1423 7.55513 18.0334 7.66128L10.0092 16.0503L6.96664 12.8694Z"
        fill={theme.palette[color ?? 'main11']}
        stroke={theme.palette[color ?? 'main11']}
        strokeWidth="0.5"
      />
    </BaseIcon>
  )
}
