import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'

import { AgentGroups } from '../../../src/features/agent-groups/AgentGroups'

const AgentListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:agents-groups'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('agent_groups')}>
        <AgentGroups />
      </CabinetLayout>
    </Permissions>
  )
}

export default AgentListPage
