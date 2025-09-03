import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { UsersList } from '../../../src/features/users/UsersList'

const AdminsListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:admins-list'))

  return (
    <Permissions roles={[ERoles.SUPERADMIN]}>
      <CabinetLayout title={t('admins_list')}>
        <UsersList
          role={ERoles.ADMIN}
          columns={['username', 'email', 'date', 'edit', 'delete']}
        />
      </CabinetLayout>
    </Permissions>
  )
}

export default AdminsListPage
