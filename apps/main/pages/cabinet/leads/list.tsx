import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { LeadList } from '@/features/leads/LeadList'
import { ERoles } from '@/constants/profile'

const LeadsListPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('leads_list')}>
        <LeadList />
      </CabinetLayout>
    </Permissions>
  )
}

export default LeadsListPage
