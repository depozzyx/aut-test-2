import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ActivityLog } from '@/features/activityLog/ActivityLog'
import { ERoles } from '@/constants/profile'

const ActivityLogPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('settings_activity_log')}>
        <ActivityLog />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActivityLogPage
