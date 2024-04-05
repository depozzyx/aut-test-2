import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CampaignsList } from '@/features/campaigns/CampaignsList'

const CampaignsListPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('campaigns-list')}>
        <CampaignsList />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignsListPage
