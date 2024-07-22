import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CampaignLog } from '@/features/activityLog/CampaignLog'
import { ERoles } from '@/constants/profile'

const CampaignsLogPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:campaigns-log'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('campaigns_log')}>
        <CampaignLog />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignsLogPage
