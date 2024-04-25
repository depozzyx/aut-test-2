import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { AgentsList } from '@/features/agents/AgentsList'

const AgentListPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('agents_list')}>
        <AgentsList />
      </CabinetLayout>
    </Permissions>
  )
}

export default AgentListPage
