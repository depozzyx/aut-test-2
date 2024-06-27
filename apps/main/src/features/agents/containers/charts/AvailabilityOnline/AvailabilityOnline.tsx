import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import {
  selectIsLoading,
  selectAvailailityOnlineData,
} from '@/features/agents/store/agent-analytics'
import { useRedux } from '@/hooks/use-redux'
import { SimpleLineChart } from '@/components/charts/SimpleLineChart'
import { Loader } from '@peiko/components/loaders/Loader'
import { SLCCustomYAxis } from '@/components/charts/components/SLCCustomYAxis'

export const AvailabilityOnline = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select } = useRedux()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectAvailailityOnlineData,
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
        {t('availability-online')}
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <SimpleLineChart
          data={data}
          YAxisCustom={SLCCustomYAxis}
          valueKey="availability"
          customLabel={{ availability: t('availability-online') }}
        />
      )}
    </Flex>
  )
}
