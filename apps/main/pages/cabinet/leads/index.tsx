import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { Leads } from '@/features/leads/Leads'
import { ERoles } from '@/constants/profile'

const LeadsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('leads')}>
        <Leads />
      </CabinetLayout>
    </Permissions>
  )
}

export default LeadsPage
