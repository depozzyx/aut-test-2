import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useTitle } from 'react-use'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { GeneralLog } from '@/features/activityLog/GeneralLog'
import { ERoles } from '@/constants/profile'

const ActivityLogPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:activity-log'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout
        padding="12px 12px 12px 24px"
        title={t('settings_activity_log')}
        titlePaddingTop="0"
      >
        <GeneralLog />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActivityLogPage
