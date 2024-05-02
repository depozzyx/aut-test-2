import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ActiveCampaigns } from '@/features/campaigns/ActiveCampaigns'

const ActiveCampaignsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('dashboard')}>
        <ActiveCampaigns />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActiveCampaignsPage
