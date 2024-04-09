import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const EditIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.2365 6.14853L17.0282 9.1167M12.3753 20H19.82M4.93059 16.0424L4 20L7.72235 19.0106L18.5041 7.54753C18.8531 7.17646 19.0491 6.67324 19.0491 6.14853C19.0491 5.62383 18.8531 5.12061 18.5041 4.74954L18.3441 4.57936C17.9951 4.2084 17.5218 4 17.0282 4C16.5347 4 16.0614 4.2084 15.7124 4.57936L4.93059 16.0424Z"
        stroke={color ? theme.palette[color] : theme.palette.main3}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  )
}
