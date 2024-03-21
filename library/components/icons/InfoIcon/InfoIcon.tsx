import { TIcon, BaseIcon } from '@peiko/components/icons'

export const InfoIcon: React.FC<TIcon> = ({ ...props }) => (
  <BaseIcon
    iconProps={{ ...props }}
    width="108"
    height="108"
    viewBox="0 0 108 108"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="54" cy="54" r="54" fill="#0007d7" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M57 31C57 29.3431 55.6569 28 54 28C52.3431 28 51 29.3431 51 31V63C51 64.6569 52.3431 66 54 66C55.6569 66 57 64.6569 57 63V31ZM54 74.7435C52.3431 74.7435 51 76.0867 51 77.7435C51 79.4004 52.3431 80.7435 54 80.7435H54.0568C55.7137 80.7435 57.0568 79.4004 57.0568 77.7435C57.0568 76.0867 55.7137 74.7435 54.0568 74.7435H54Z"
      fill="white"
    />
  </BaseIcon>
)
