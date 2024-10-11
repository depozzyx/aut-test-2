import { useCallback } from 'react'
import { useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { dateToString } from '@/utils/date-to-string'
import { Loader } from '@peiko/components/loaders/Loader'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { CAMPAIGN_TABLE_TYPES } from './constants'
import { resetStore, setDateFilter } from './store/campaign-analytics'
import { CampaignNameFilter } from './containers/filters/CampaignNameFilter'
import { useCampaignAnalytics } from './hooks/use-campaignAnalytics'

const CallAnswerRate = dynamic(
  () => import('./containers/charts/CallAnswerRate').then((mod) => mod.CallAnswerRate),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

const ConversionRate = dynamic(
  () => import('./containers/charts/ConversionRate').then((mod) => mod.ConversionRate),
  {
    loading: () => <Loader />,
  },
)

const AverageCallDuration = dynamic(
  () =>
    import('./containers/charts/AverageCallDuration').then(
      (mod) => mod.AverageCallDuration,
    ),
  {
    loading: () => <Loader />,
  },
)

export const CampaignAnalytics = (): JSX.Element => {
  const { dispatch } = useRedux()
  useCampaignAnalytics()

  useUnmount(() => {
    dispatch(resetStore())
  })

  const handleChangeDate = useCallback((date: { from?: Date; to?: Date }) => {
    const copyFilters = {
      ...(date?.from && { fromDate: dateToString(date.from) ?? undefined }),
      ...(date?.to && { toDate: dateToString(date.to) ?? undefined }),
    }

    if (Object.keys(copyFilters).length > 0) {
      dispatch(setDateFilter(copyFilters))
    }
  }, [])

  return (
    <Flex padding="12px 0 0 0" width="100%">
      <Flex direction="column" gap={12} margin="0 auto" maxWidth={844} width="100%">
        <Flex className="configure-panel" width="100%" align="center" gap={16}>
          <RangeDayPicker onChange={handleChangeDate} />
          <CampaignNameFilter type={CAMPAIGN_TABLE_TYPES.LIST} useIdForValue />
        </Flex>
        <Flex className="charts-container" direction="column" gap={20} width="100%">
          <ConversionRate />
          <CallAnswerRate />
          <AverageCallDuration />
        </Flex>
      </Flex>
    </Flex>
  )
}
