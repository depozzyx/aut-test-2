import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import {
  selectCallMinutesData,
  selectIsLoading,
} from '@/features/agents/store/agent-analytics'
import { useRedux } from '@/hooks/use-redux'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { SimpleLineChart } from '@/components/charts/SimpleLineChart'
import { Loader } from '@peiko/components/loaders/Loader'
import { SLCCustomYAxis } from '@/components/charts/components/SLCCustomYAxis'

export const CallMinutes = (): JSX.Element => {
  const { t } = useTranslation('agents')

  const { select } = useRedux()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectCallMinutesData,
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
        {t('call-minutes')}
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <SimpleLineChart
          data={data}
          YAxisCustom={SLCCustomYAxis}
          valueKey="callMinutes"
          customLabel={{ callMinutes: t('call-minutes') }}
        />
      )}
    </Flex>
  )
}
