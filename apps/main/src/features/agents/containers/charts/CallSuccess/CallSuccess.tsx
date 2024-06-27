import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import {
  selectIsLoading,
  selectCallSuccessData,
} from '@/features/agents/store/agent-analytics'
import { useRedux } from '@/hooks/use-redux'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { Loader } from '@peiko/components/loaders/Loader'
import { Chart } from './components/Chart'

export const CallSuccess = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select } = useRedux()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectCallSuccessData,
    }),
    shallowEqual,
  )

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
      {isLoading ? <Loader /> : <Chart data={data} />}
    </Flex>
  )
}
