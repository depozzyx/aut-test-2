import { format, parseISO } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { CalendarIcon } from '@peiko/components/icons/CalendarIcon'
import { LeadsIcon } from '@/icons/LeadsIcon'
import { AgentsIcon } from '@/icons/AgentsIcon'
import { selectCampaignById } from '@/features/campaigns/store/campaigns'
import { ContentItem } from './ContentItem'

type TProps = {
  campaignId: number
}

const formatDate = (dateString: string): string => {
  const date = parseISO(dateString)
  return format(date, 'EEE MMM dd')
}

export const CampaignAccordionContent = ({ campaignId }: TProps): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { select } = useRedux()

  const currentCampaign = select(selectCampaignById(campaignId))

  if (!currentCampaign) {
    return <Flex>{t('campaign.no-info')}</Flex>
  }

  const contentItems = [
    {
      id: 'calendar',
      icon: <CalendarIcon width="24px" height="24px" color="main2" />,
      value: formatDate(currentCampaign.createdAt),
    },
    {
      id: 'lead',
      icon: <LeadsIcon width="24px" height="24px" color="main2" />,
      value: currentCampaign.leadCount ?? '',
    },
    {
      id: 'agent',
      icon: <AgentsIcon width="24px" height="24px" color="main2" />,
      value: currentCampaign.agentCount ?? '',
    },
  ]

  return (
    <Flex align="center" gap={24}>
      {contentItems.map((item) => (
        <ContentItem key={item.id} {...item} />
      ))}
    </Flex>
  )
}
