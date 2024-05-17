import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { useAgentAnalytics } from '@/features/agents/hooks/use-agentAnalytics'
import { SimpleLineChart } from '@/components/charts/SimpleLineChart'
import { Loader } from '@peiko/components/loaders/Loader'
import { mockTimeOnline } from '@/features/agents/mocks/analytics'
import { SLCCustomYAxis } from '../components/SLCCustomYAxis'

export const TimeOnline = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { isLoading } = useAgentAnalytics()

  return (
    <Flex direction="column" gap={18} width="100%" height={536}>
      <Text
        variant="f4"
        color="main5"
        styles={{
          lineHeight: '24px',
          textTransform: 'capitalize',
        }}
      >
        {t('time-online')}
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <SimpleLineChart
          data={mockTimeOnline}
          YAxisCustom={SLCCustomYAxis}
          valueKey="callMinutes"
        />
      )}
    </Flex>
  )
}
