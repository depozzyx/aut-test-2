import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { AgentsList } from '@/features/agents/AgentsList'

const AgentListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:agents-list'))

  return (
    <Permissions>
      <CabinetLayout title={t('agents_list')}>
        <AgentsList />
      </CabinetLayout>
    </Permissions>
  )
}

export default AgentListPage
