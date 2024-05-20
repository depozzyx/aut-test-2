import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CampaignAnalytics } from '@/features/campaigns/CampaignAnalytics'

const CampaignsAnalyticsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:campaigns-analytics'))

  return (
    <Permissions>
      <CabinetLayout title={t('campaigns_analytics')}>
        <CampaignAnalytics />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignsAnalyticsPage
