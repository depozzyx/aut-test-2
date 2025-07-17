import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { AgentAnalytics } from '@/features/agents/AgentAnalytics'
import { ERoles } from '@/constants/profile'

const AgentsAnalyticsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:agents-analytics'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('agents_analytics')}>
        <AgentAnalytics />
      </CabinetLayout>
    </Permissions>
  )
}

export default AgentsAnalyticsPage
