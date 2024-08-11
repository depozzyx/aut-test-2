import { useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { CAMPAIGN_TABLE_TYPES } from './constants'
import { resetStore } from './store/campaign-analytics'
import { CampaignNameFilter } from './containers/filters/CampaignNameFilter'
import { useCampaignAnalytics } from './hooks/use-campaignAnalytics'

const RangeDayPicker = dynamic(
  () => import('@/inputs/RangeDayPicker').then((mod) => mod.RangeDayPicker),
  {
    ssr: false,
  },
)

const CallAnswerRate = dynamic(
  () => import('./containers/charts/CallAnswerRate').then((mod) => mod.CallAnswerRate),
  {
    ssr: false,
  },
)

const ConversionRate = dynamic(
  () => import('./containers/charts/ConversionRate').then((mod) => mod.ConversionRate),
  {
    ssr: false,
  },
)

const AverageCallDuration = dynamic(
  () =>
    import('./containers/charts/AverageCallDuration').then(
      (mod) => mod.AverageCallDuration,
    ),
  {
    ssr: false,
  },
)

export const CampaignAnalytics = (): JSX.Element => {
  const { dispatch } = useRedux()
  useCampaignAnalytics()

  useUnmount(() => {
    dispatch(resetStore())
  })

  return (
    <Flex padding="12px 0 0 0" width="100%">
      <Flex direction="column" gap={12} margin="0 auto" maxWidth={844} width="100%">
        <Flex className="configure-panel" width="100%" align="center" gap={16}>
          <RangeDayPicker />
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
