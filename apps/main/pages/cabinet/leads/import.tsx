import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ImportLeads } from '@/features/leads/ImportLeads'
import { ERoles } from '@/constants/profile'

const ImportLeadsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('import_leads')}>
        <ImportLeads />
      </CabinetLayout>
    </Permissions>
  )
}

export default ImportLeadsPage
