import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { useAgentAnalytics } from '@/features/agents/hooks/use-agentAnalytics'
import { SimpleLineChart } from '@/components/charts/SimpleLineChart'
import { Loader } from '@peiko/components/loaders/Loader'
import { mockAvailabilityOnline } from '@/features/agents/mocks/analytics'
import { SLCCustomYAxis } from '../components/SLCCustomYAxis'

export const AvailabilityOnline = (): JSX.Element => {
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
        {t('availability-online')}
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <SimpleLineChart
          data={mockAvailabilityOnline}
          YAxisCustom={SLCCustomYAxis}
          valueKey="availability"
        />
      )}
    </Flex>
  )
}
