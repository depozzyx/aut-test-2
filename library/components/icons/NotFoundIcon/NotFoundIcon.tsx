import { FC } from 'react'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const NotFoundIcon: FC<TIcon> = (props) => (
  <BaseIcon
    iconProps={{ ...props }}
    viewBox="0 0 378 149"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_124_3344)">
      <path
        d="M70.4 149V120.6H0.4V98.6L65.8 4.99999H98.4V96.2H116V120.6H98.4V149H70.4ZM31.2 96.2H72.2V35L31.2 96.2ZM133.827 74.2C133.827 32 146.627 0.399994 187.827 0.399994C229.027 0.399994 241.827 32 241.827 74.2C241.827 116.8 229.027 148.6 187.827 148.6C146.627 148.6 133.827 116.8 133.827 74.2ZM214.227 74.2C214.227 49.2 211.427 26.4 187.827 26.4C164.227 26.4 161.427 49.2 161.427 74.2C161.427 100.2 164.227 122.6 187.827 122.6C211.427 122.6 214.227 100.2 214.227 74.2ZM331.923 149V120.6H261.923V98.6L327.323 4.99999H359.923V96.2H377.523V120.6H359.923V149H331.923ZM292.723 96.2H333.723V35L292.723 96.2Z"
        fill="#D1EBFD"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_124_3344"
        x="0.400391"
        y="0.399994"
        width="377.123"
        height="150.6"
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
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.184314 0 0 0 0 0.427451 0 0 0 0 0.713726 0 0 0 0.56 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_124_3344" />
      </filter>
    </defs>
  </BaseIcon>
)
