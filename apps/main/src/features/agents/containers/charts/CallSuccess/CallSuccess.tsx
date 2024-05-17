import { useAgentAnalytics } from '@/features/agents/hooks/use-agentAnalytics'

import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { Loader } from '@peiko/components/loaders/Loader'
import { mockCallSuccess } from '@/features/agents/mocks/analytics'
import { Chart } from './components/Chart'

export const CallSuccess = (): JSX.Element => {
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
        {t('average-call-duration')}
      </Text>
      {isLoading ? <Loader /> : <Chart data={mockCallSuccess} />}
    </Flex>
  )
}
