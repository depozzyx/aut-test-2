import { memo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'
import { useTheme } from 'styled-components'
import { deepEqual } from '@peiko/utils/deep-equal'
import { BaseXAxis } from '@/components/charts/components/BaseXAxis'
import { BaseAxisTickY } from '@/components/charts/components/BaseAxisTickY'
import { BaseTooltip } from '@/components/charts/components/BaseTooltip'
import { TCallSuccessChartData } from './types'

type TChartProps = {
  data: TCallSuccessChartData[]
}

export const Chart = memo(({ data }: TChartProps) => {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} height={444}>
        <CartesianGrid stroke={theme.palette.main20} />
        <XAxis
          dataKey="date"
          stroke={theme.palette.main22}
          tick={(props) => <BaseXAxis {...props} />}
        />
        <YAxis
          stroke={theme.palette.main22}
          tick={(props) => <BaseAxisTickY {...props} />}
          tickMargin={30}
        />
        <Tooltip
          cursor={{ stroke: theme.palette.main5, strokeWidth: 1 }}
          content={({ payload, active }) => (
            <BaseTooltip payload={payload} active={active} />
          )}
        />
        <Legend
          iconType="square"
          verticalAlign="top"
          align="left"
          height={46}
          margin={{ left: 40 }}
        />
        <Line
          type="linear"
          dataKey="successfulCalls"
          stroke={theme.palette.main11}
          dot={false}
        />
        <Line
          type="linear"
          dataKey="undeterminedCalls"
          stroke={theme.palette.main22}
          dot={false}
        />
        <Line
          type="linear"
          dataKey="unsuccessfulCalls"
          stroke={theme.palette.main13}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}, deepEqual)

Chart.displayName = 'Chart'
