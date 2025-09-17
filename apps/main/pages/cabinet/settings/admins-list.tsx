import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { UsersList } from '../../../src/features/users/UsersList'
import { useAuth } from '../../../src/features/common/user'
import { userPermissions } from '../../../src/features/users/constants'
import { TUserRowKeys } from '../../../src/features/users/containers/tables/AgentsListTable/UsersListTable'

const AdminsListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:admins-list'))
  const { user } = useAuth()

  const columns = ['username', 'email', 'date', 'edit', 'delete'].filter((col) => {
    if (col === 'edit' || col === 'delete') {
      return user?.permissions.includes(userPermissions[ERoles.ADMIN][col])
    }
    return true
  }) as TUserRowKeys[]

  return (
    <Permissions roles={[ERoles.SUPERADMIN]}>
      <CabinetLayout title={t('admins_list')}>
        <UsersList role={ERoles.ADMIN} columns={columns} />
      </CabinetLayout>
    </Permissions>
  )
}

export default AdminsListPage
