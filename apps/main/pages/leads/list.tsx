import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { LeadsList } from '@/features/leads/LeadsList'

const LeadsListPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('leads_list')}>
        <LeadsList />
      </CabinetLayout>
    </Permissions>
  )
}

export default LeadsListPage
