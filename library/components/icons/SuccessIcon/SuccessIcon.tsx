import { TIcon, BaseIcon } from '@peiko/components/icons'

export const SuccessIcon: React.FC<TIcon> = ({ ...props }) => (
  <BaseIcon
    iconProps={{ ...props }}
    viewBox="0 0 108 108"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="54" cy="54" r="54" fill="#4c9700" />
    <path
      d="M80.8791 37.4401L43.9191 74.4001L27.1191 57.6001"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
)
