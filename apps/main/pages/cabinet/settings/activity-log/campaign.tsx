import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useTitle } from 'react-use'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CampaignLog } from '@/features/activityLog/CampaignLog'
import { ERoles } from '@/constants/profile'

const CampaignLogPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:activity-log'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout
        padding="12px 12px 12px 24px"
        title={t('settings_activity_log')}
        titlePaddingTop="0"
      >
        <CampaignLog />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignLogPage
