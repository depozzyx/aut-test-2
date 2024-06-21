import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const CopyIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 10.286C8.5 9.67971 8.74085 9.09826 9.16955 8.66955C9.59826 8.24085 10.1797 8 10.786 8H18.214C18.5142 8 18.8115 8.05913 19.0888 8.17401C19.3662 8.28889 19.6182 8.45728 19.8304 8.66955C20.0427 8.88183 20.2111 9.13384 20.326 9.41119C20.4409 9.68854 20.5 9.9858 20.5 10.286V17.714C20.5 18.0142 20.4409 18.3115 20.326 18.5888C20.2111 18.8662 20.0427 19.1182 19.8304 19.3304C19.6182 19.5427 19.3662 19.7111 19.0888 19.826C18.8115 19.9409 18.5142 20 18.214 20H10.786C10.4858 20 10.1885 19.9409 9.91119 19.826C9.63384 19.7111 9.38183 19.5427 9.16955 19.3304C8.95728 19.1182 8.78889 18.8662 8.67401 18.5888C8.55913 18.3115 8.5 18.0142 8.5 17.714V10.286Z"
        stroke={color ? theme.palette[color] : theme.palette.main2}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.39956 16C5.12667 15.8476 4.89969 15.627 4.74169 15.3605C4.58369 15.094 4.5003 14.7911 4.5 14.4826V5.74711C4.5 4.7862 5.3 4 6.27778 4H15.1667C15.8333 4 16.196 4.33632 16.5 4.87355"
        stroke={color ? theme.palette[color] : theme.palette.main2}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  )
}
