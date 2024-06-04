import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ManagersList } from '@/features/managers/ManagersList'
import { ERoles } from '@/constants/profile'

const ManagersListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:managers-list'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('managers_list')}>
        <ManagersList />
      </CabinetLayout>
    </Permissions>
  )
}

export default ManagersListPage
