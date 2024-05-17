import { useTheme } from 'styled-components'
import { getXaxisDate } from '../../utils'
import { TXAxisProps } from '../../types'

type TTextProps = {
  value: string | number
}

export const Text = ({ value }: TTextProps): JSX.Element => {
  const theme = useTheme()
  return (
    <text
      fill={theme.palette.main22}
      fontSize={12}
      fontWeight={400}
      style={{ textAnchor: 'middle' }}
    >
      {value}
    </text>
  )
}

export const BaseXAxis = ({ x, y, payload }: TXAxisProps): JSX.Element => {
  const formattedDate = getXaxisDate(payload.value)
  return (
    <>
      <g transform={`translate(${x},${y + 12})`}>
        <Text value={formattedDate} />
      </g>
    </>
  )
}
