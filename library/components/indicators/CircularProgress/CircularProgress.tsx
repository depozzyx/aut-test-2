import React from 'react'
import { useTheme } from 'styled-components'
import { TCircularProgressProps } from './types'

export const CircularProgress: React.FC<TCircularProgressProps> = ({
  size = 40,
  borderWidth = 4,
  progress,
}) => {
  const theme = useTheme()
  const radius = size / 2
  const stroke = borderWidth
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={theme.palette.base}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        strokeLinecap="round"
        stroke={theme.palette.main2}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
    </svg>
  )
}
