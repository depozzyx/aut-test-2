import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { Dashboard } from '@/layout/pages/Dashboard'

const ActiveCampaignsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('dashboard')}>
        <Dashboard />
      </CabinetLayout>
    </Permissions>
  )
}

export default ActiveCampaignsPage
