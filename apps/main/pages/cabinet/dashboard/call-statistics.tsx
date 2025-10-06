import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { ActiveCallsStatistics } from '@/features/reports/ActiveCallsStatistics'

const ActiveCallsStatisticsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:dashboard-call-statistics'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('dashboard')}>
        <ActiveCallsStatistics />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActiveCallsStatisticsPage
