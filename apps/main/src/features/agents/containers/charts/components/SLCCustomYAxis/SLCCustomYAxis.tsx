import { useTheme } from 'styled-components'
import { TAxisTickYProps } from '@/components/charts/types'

export const SLCCustomYAxis = ({
  x,
  y,
  payload: { value },
}: TAxisTickYProps): JSX.Element => {
  const theme = useTheme()

  const yaxisValue = `${value} min`

  return (
    <>
      <g transform={`translate(${x},${y})`}>
        <text
          fill={theme.palette.main22}
          fontSize={12}
          fontWeight={400}
          style={{ textAnchor: 'middle', dominantBaseline: 'middle' }}
        >
          {yaxisValue}
        </text>
      </g>
    </>
  )
}
