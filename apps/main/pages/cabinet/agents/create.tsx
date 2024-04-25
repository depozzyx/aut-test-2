import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CreateAgent } from '@/features/agents/CreateAgent'

const CreateAgentPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('create_agent')}>
        <CreateAgent />
      </CabinetLayout>
    </Permissions>
  )
}

export default CreateAgentPage
