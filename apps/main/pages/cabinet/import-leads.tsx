import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ImportLeads } from '@/features/leads/ImportLeads'

const ImportLeadsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('import-leads')}>
        <ImportLeads />
      </CabinetLayout>
    </Permissions>
  )
}

export default ImportLeadsPage
