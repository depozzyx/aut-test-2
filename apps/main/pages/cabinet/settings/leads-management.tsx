import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { LeadStatuses } from '@/features/settings/LeadStatuses'

const LeadsManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:leads-management'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('settings_leads_management')}>
        <LeadStatuses />
      </CabinetLayout>
    </Permissions>
  )
}

export default LeadsManagementPage
