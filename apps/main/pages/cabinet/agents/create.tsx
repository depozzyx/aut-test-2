import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CreateAgent } from '@/features/agents/CreateAgent'
import { ERoles } from '@/constants/profile'

const CreateAgentPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:create-agent'))

  return (
    <Permissions roles={[ERoles.MANAGER]}>
      <CabinetLayout title={t('create_agent')}>
        <CreateAgent />
      </CabinetLayout>
    </Permissions>
  )
}

export default CreateAgentPage
