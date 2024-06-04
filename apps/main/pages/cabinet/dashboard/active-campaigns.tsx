import { NextPage } from 'next'
import { useTitle } from 'react-use'

import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ActiveCampaigns } from '@/features/campaigns/ActiveCampaigns'
import { ERoles } from '@/constants/profile'

const ActiveCampaignsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:dashboard-campaigns'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('dashboard')}>
        <ActiveCampaigns />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActiveCampaignsPage
