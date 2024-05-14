import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { Calls } from '@/features/calls/Calls'

const AgentsCallsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('agents_calls')}>
        <Calls />
      </CabinetLayout>
    </Permissions>
  )
}

export default AgentsCallsPage
