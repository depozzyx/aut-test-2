import { memo, useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import { useTheme } from 'styled-components'
import { TSimpleChartData } from '@/components/charts/types'
import { deepEqual } from '@peiko/utils/deep-equal'
import { BaseXAxis } from '../components/BaseXAxis'
import { BaseAxisTickY } from '../components/BaseAxisTickY'
import { BaseTooltip } from '../components/BaseTooltip'

type TSimpleLineChartProps = {
  data: TSimpleChartData[]
  valueKey?: string
  XAxisCustom?: React.ElementType
  YAxisCustom?: React.ElementType
}

export const SimpleLineChart = memo(
  ({ data, valueKey, XAxisCustom, YAxisCustom }: TSimpleLineChartProps) => {
    const theme = useTheme()

    const XAxisComponent = XAxisCustom || BaseXAxis
    const AxisTickYComponent = YAxisCustom || BaseAxisTickY

    const xaxisInterval = useMemo(() => {
      if (data.length <= 8) {
        return 0
      }
      return 'equidistantPreserveStart'
    }, [data])

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} height={444}>
          <CartesianGrid stroke={theme.palette.main20} />
          <XAxis
            dataKey="date"
            stroke={theme.palette.main22}
            interval={xaxisInterval}
            tick={(props) => <XAxisComponent {...props} />}
          />
          <YAxis
            stroke={theme.palette.main22}
            tick={(props) => <AxisTickYComponent {...props} />}
            tickMargin={10}
          />
          <Tooltip
            cursor={{ stroke: theme.palette.main5, strokeWidth: 1 }}
            content={({ payload, active }) => (
              <BaseTooltip payload={payload} active={active} />
            )}
          />
          <Line
            type="linear"
            dataKey={valueKey || 'value'}
            stroke={theme.palette.main3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  },
  deepEqual,
)

SimpleLineChart.displayName = 'SimpleLineChart'
