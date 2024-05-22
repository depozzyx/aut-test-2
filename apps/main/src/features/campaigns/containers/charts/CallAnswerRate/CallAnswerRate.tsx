import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { SimpleLineChart } from '@/components/charts/SimpleLineChart'
import { Loader } from '@peiko/components/loaders/Loader'
import {
  selectAnswerRateData,
  selectIsLoading,
} from '@/features/campaigns/store/campaign-analytics'
import { mockCallAnswerRate } from '@/features/campaigns/mocks/analytics'

export const CallAnswerRate = (): JSX.Element => {
  const { t } = useTranslation('campaigns')

  const { select } = useRedux()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectAnswerRateData,
    }),
    shallowEqual,
  )

  const isEveryValueNull = useMemo(
    () => data.every((item) => item.callAnswerRate === 0),
    [data],
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
        {t('callAnswer-rate')}
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <SimpleLineChart
          data={isEveryValueNull ? mockCallAnswerRate : data}
          valueKey="callAnswerRate"
          customLabel={{ callAnswerRate: t('callAnswer-rate') }}
        />
      )}
    </Flex>
  )
}
