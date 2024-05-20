import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { CampaignNameFilter } from './containers/filters/CampaignNameFilter'
import { useCampaignAnalytics } from './hooks/use-campaignAnalytics'
import { ConversionRate } from './containers/charts/ConversionRate/ConversionRate'
import { CallAnswerRate } from './containers/charts/CallAnswerRate'
import { AverageCallDuration } from './containers/charts/AverageCallDuration/AverageCallDuration'

export const CampaignAnalytics = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  useCampaignAnalytics()

  return (
    <Flex padding="12px 0 0 0" width="100%">
      <Flex direction="column" gap={12} margin="0 auto" maxWidth={844} width="100%">
        <Flex
          className="configure-panel"
          width="100%"
          justify="space-between"
          align="center"
        >
          <Flex gap={16}>
            <RangeDayPicker />
            <CampaignNameFilter type={CAMPAIGN_TABLE_TYPES.LIST} />
          </Flex>
          <FilledButton>{t('custom-report')}</FilledButton>
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
