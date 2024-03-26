import { useTheme } from 'styled-components'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const HeartFilledIcon: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme()

  return (
    <BaseIcon
      iconProps={{ ...props }}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.28974 2.31026C4.72719 0.227646 7.85674 0.58614 9.99353 2.40485C12.1277 0.585526 15.2245 0.254123 17.6878 2.30149C20.4065 4.5612 20.7327 8.41616 18.6396 11.1095C17.8489 12.127 16.3105 13.6502 14.8384 15.0397C13.3471 16.4473 11.8594 17.7773 11.1259 18.4269L11.1113 18.4398C11.0431 18.5003 10.9544 18.579 10.8688 18.6434C10.7652 18.7214 10.613 18.8209 10.4085 18.882C10.1388 18.9624 9.84911 18.9624 9.57943 18.882C9.37492 18.8209 9.22273 18.7214 9.11915 18.6434C9.03354 18.579 8.94484 18.5003 8.87657 18.4398L8.86202 18.4269C8.12847 17.7773 6.64083 16.4473 5.14953 15.0397C3.67739 13.6502 2.13904 12.127 1.34829 11.1095C-0.753603 8.40479 -0.366541 4.57985 2.28974 2.31026Z"
        fill={color ? theme.palette[color] : theme.palette.base}
      />
    </BaseIcon>
  )
}
