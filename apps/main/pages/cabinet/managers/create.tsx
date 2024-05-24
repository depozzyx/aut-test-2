import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'

const CreateManagerPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:create-manager'))

  return (
    <Permissions>
      <CabinetLayout title={t('create_manager')} />
    </Permissions>
  )
}

export default CreateManagerPage
