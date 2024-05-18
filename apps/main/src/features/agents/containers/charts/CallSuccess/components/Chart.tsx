import { memo, useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
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
  const { t } = useTranslation('agents')
  const theme = useTheme()

  const xaxisInterval = useMemo(() => {
    if (data.length <= 8) {
      return 0
    }
    return 'equidistantPreserveStart'
  }, [data])

  const labels = {
    successfulCalls: t('tooltip.successful-calls'),
    undeterminedCalls: t('tooltip.undetermined-calls'),
    unsuccessfulCalls: t('tooltip.unsuccessful-calls'),
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} height={444}>
        <CartesianGrid stroke={theme.palette.main20} />
        <XAxis
          dataKey="date"
          stroke={theme.palette.main22}
          tick={(props) => <BaseXAxis {...props} />}
          interval={xaxisInterval}
          padding={{ right: 14 }}
        />
        <YAxis
          stroke={theme.palette.main22}
          tick={(props) => <BaseAxisTickY {...props} />}
          tickMargin={30}
        />
        <Tooltip
          cursor={{ stroke: theme.palette.main5, strokeWidth: 1 }}
          content={({ payload, active }) => (
            <BaseTooltip payload={payload} active={active} customLabel={labels} />
          )}
        />
        <Legend
          iconType="square"
          iconSize={12}
          verticalAlign="top"
          align="left"
          height={46}
          wrapperStyle={{
            paddingLeft: 50,
          }}
        />
        <Line
          name={t('tooltip.successful-calls')}
          type="linear"
          dataKey="successfulCalls"
          stroke={theme.palette.main11}
          dot={false}
        />
        <Line
          name={t('tooltip.undetermined-calls')}
          type="linear"
          dataKey="undeterminedCalls"
          stroke={theme.palette.main22}
          dot={false}
        />
        <Line
          name={t('tooltip.unsuccessful-calls')}
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
