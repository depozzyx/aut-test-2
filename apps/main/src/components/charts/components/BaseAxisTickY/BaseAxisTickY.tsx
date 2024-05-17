import { useTheme } from 'styled-components'
import { TAxisTickYProps } from '@/components/charts/types'

export const BaseAxisTickY = ({
  x,
  y,
  payload: { value },
}: TAxisTickYProps): JSX.Element => {
  const theme = useTheme()

  return (
    <>
      <g transform={`translate(${x},${y})`}>
        <text
          fill={theme.palette.main22}
          fontSize={12}
          fontWeight={400}
          style={{ textAnchor: 'middle' }}
        >
          {value}
        </text>
      </g>
    </>
  )
}
