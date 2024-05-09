import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ActiveAgents } from '@/features/agents/ActiveAgents'

const ActiveAgentsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:dashboard-agents'))

  return (
    <Permissions>
      <CabinetLayout title={t('dashboard')}>
        <ActiveAgents />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActiveAgentsPage
