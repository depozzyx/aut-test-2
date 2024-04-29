import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ImportLeadsInstruction } from '@/features/leads/ImportLeadsInstruction'

const APIListInstructionsPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('import_leads_instructions_title')}>
        <ImportLeadsInstruction />
      </CabinetLayout>
    </Permissions>
  )
}

export default APIListInstructionsPage
