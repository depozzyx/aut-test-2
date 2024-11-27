import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { Campaigns } from '@/features/settings/Campaigns'

const CampaignsManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:campaigns-management'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('settings_campaigns_management')}>
        <Campaigns />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignsManagementPage
