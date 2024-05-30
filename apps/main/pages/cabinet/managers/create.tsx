import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { CreateManager } from '@/features/managers/CreateManager'
import { ERoles } from '@/constants/profile'

const CreateManagerPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:create-manager'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('create_manager')}>
        <CreateManager />
      </CabinetLayout>
    </Permissions>
  )
}

export default CreateManagerPage
