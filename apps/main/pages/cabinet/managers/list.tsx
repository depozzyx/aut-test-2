import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { UsersList } from '../../../src/features/users/UsersList'

const ManagersListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:managers-list'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('managers_list')}>
        <UsersList
          role={ERoles.MANAGER}
          columns={['username', 'email', 'pbxName', 'date', 'edit', 'delete']}
        />
      </CabinetLayout>
    </Permissions>
  )
}

export default ManagersListPage
