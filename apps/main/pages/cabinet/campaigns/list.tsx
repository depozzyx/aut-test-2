import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CampaignsList } from '@/features/campaigns/CampaignsList'

const CampaignsListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:campaigns-list'))

  return (
    <Permissions>
      <CabinetLayout title={t('campaigns_list')}>
        <CampaignsList />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignsListPage
