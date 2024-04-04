import { TIcon, BaseIcon } from '@peiko/components/icons'

export const ErrorIcon: React.FC<TIcon> = ({ ...props }) => (
  <BaseIcon
    iconProps={{ ...props }}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      d="M20.0002 33.3333C12.6502 33.3333 6.66683 27.3499 6.66683 19.9999C6.66683 12.6499 12.6502 6.66659 20.0002 6.66659C27.3502 6.66659 33.3335 12.6499 33.3335 19.9999C33.3335 27.3499 27.3502 33.3333 20.0002 33.3333ZM20.0002 3.33325C10.7835 3.33325 3.3335 10.7833 3.3335 19.9999C3.3335 29.2166 10.7835 36.6666 20.0002 36.6666C29.2168 36.6666 36.6668 29.2166 36.6668 19.9999C36.6668 10.7833 29.2168 3.33325 20.0002 3.33325ZM24.3168 13.3333L20.0002 17.6499L15.6835 13.3333L13.3335 15.6833L17.6502 19.9999L13.3335 24.3166L15.6835 26.6666L20.0002 22.3499L24.3168 26.6666L26.6668 24.3166L22.3502 19.9999L26.6668 15.6833L24.3168 13.3333Z"
      fill="#FD033F"
    />
    <defs>
      <filter
        id="filter0_i_484_31439"
        x="0"
        y="0"
        width="40"
        height="41"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.579167 0 0 0 0 0.159271 0 0 0 0 0.260046 0 0 0 0.56 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_484_31439" />
      </filter>
    </defs>
  </BaseIcon>
)
