import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { SimpleLineChart } from '@/components/charts/SimpleLineChart'
import { Loader } from '@peiko/components/loaders/Loader'
import { mockAverageCallDuration } from '@/features/campaigns/mocks/analytics'
import { SLCCustomYAxis } from '@/components/charts/components/SLCCustomYAxis'
import {
  selectAverageCallDurationData,
  selectIsLoading,
} from '@/features/campaigns/store/campaign-analytics'

export const AverageCallDuration = (): JSX.Element => {
  const { t } = useTranslation('campaigns')

  const { select } = useRedux()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectAverageCallDurationData,
    }),
    shallowEqual,
  )

  const isEveryValueNull = useMemo(
    () => data.every((item) => item.averageCallDuration === 0),
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
        {t('average-callDuration')}
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <SimpleLineChart
          data={isEveryValueNull ? mockAverageCallDuration : data}
          YAxisCustom={SLCCustomYAxis}
          valueKey="averageCallDuration"
          customLabel={{ averageCallDuration: t('average-callDuration') }}
        />
      )}
    </Flex>
  )
}
