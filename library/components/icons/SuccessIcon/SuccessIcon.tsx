import { TIcon, BaseIcon } from '@peiko/components/icons'

export const SuccessIcon: React.FC<TIcon> = ({ ...props }) => (
  <BaseIcon
    iconProps={{ ...props }}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      d="M19.9999 3.33325C10.8333 3.33325 3.33325 10.8333 3.33325 19.9999C3.33325 29.1666 10.8333 36.6666 19.9999 36.6666C29.1666 36.6666 36.6666 29.1666 36.6666 19.9999C36.6666 10.8333 29.1666 3.33325 19.9999 3.33325ZM19.9999 33.3333C12.6499 33.3333 6.66659 27.3499 6.66659 19.9999C6.66659 12.6499 12.6499 6.66659 19.9999 6.66659C27.3499 6.66659 33.3333 12.6499 33.3333 19.9999C33.3333 27.3499 27.3499 33.3333 19.9999 33.3333ZM27.6499 12.6333L16.6666 23.6166L12.3499 19.3166L9.99992 21.6666L16.6666 28.3333L29.9999 14.9999L27.6499 12.6333Z"
      fill="#1EBB53"
    />
    <defs>
      <filter
        id="filter0_i_455_29520"
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
          values="0 0 0 0 0.0395312 0 0 0 0 0.4125 0 0 0 0 0.215769 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_455_29520" />
      </filter>
    </defs>
  </BaseIcon>
)
