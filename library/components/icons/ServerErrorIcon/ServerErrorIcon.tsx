import { FC } from 'react'
import { TIcon, BaseIcon } from '@peiko/components/icons'

export const ServerErrorIcon: FC<TIcon> = (props) => (
  <BaseIcon
    iconProps={{ ...props }}
    viewBox="0 0 362 149"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_128_3377)">
      <path
        d="M3.2 2.8H93.6V27.4H28.8V61.6C34.2 55 45.2 49.8 57.4 49.8C91.4 49.8 103 75.4 103 98C103 127.8 85.8 149 52.6 149C21.2 149 3.2 131.6 0.800001 107.8H28C30.4 118 38.6 125.4 52.2 125.4C68.6 125.4 76 113.8 76 98.4C76 82 67.8 73 52 73C40.4 73 33 79.4 30 88.4H3.2V2.8ZM124.311 74.2C124.311 32 137.111 0.399994 178.311 0.399994C219.511 0.399994 232.311 32 232.311 74.2C232.311 116.8 219.511 148.6 178.311 148.6C137.111 148.6 124.311 116.8 124.311 74.2ZM204.711 74.2C204.711 49.2 201.911 26.4 178.311 26.4C154.711 26.4 151.911 49.2 151.911 74.2C151.911 100.2 154.711 122.6 178.311 122.6C201.911 122.6 204.711 100.2 204.711 74.2ZM253.608 74.2C253.608 32 266.408 0.399994 307.608 0.399994C348.808 0.399994 361.608 32 361.608 74.2C361.608 116.8 348.808 148.6 307.608 148.6C266.408 148.6 253.608 116.8 253.608 74.2ZM334.008 74.2C334.008 49.2 331.208 26.4 307.608 26.4C284.008 26.4 281.208 49.2 281.208 74.2C281.208 100.2 284.008 122.6 307.608 122.6C331.208 122.6 334.008 100.2 334.008 74.2Z"
        fill="#D1EBFD"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_128_3377"
        x="0.800781"
        y="0.399994"
        width="360.807"
        height="152.6"
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
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="5.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.184314 0 0 0 0 0.427451 0 0 0 0 0.713726 0 0 0 0.56 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_128_3377" />
      </filter>
    </defs>
  </BaseIcon>
)
