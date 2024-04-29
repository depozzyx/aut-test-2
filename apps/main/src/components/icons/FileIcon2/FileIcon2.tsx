import React from 'react'
import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const FileIcon2: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V5C4 4.46957 4.21071 3.96086 4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3H14M20 9V8.828C19.9999 8.29761 19.7891 7.78899 19.414 7.414L15.586 3.586C15.211 3.2109 14.7024 3.00011 14.172 3H14M20 9H16C15.4696 9 14.9609 8.78929 14.5858 8.41421C14.2107 8.03914 14 7.53043 14 7V3"
        stroke={theme.palette[color ?? 'main4']}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  )
}
