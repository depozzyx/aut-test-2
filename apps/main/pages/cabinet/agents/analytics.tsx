import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'

const AgentsAnalyticsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('agents_analytics')} />
    </Permissions>
  )
}

export default AgentsAnalyticsPage
