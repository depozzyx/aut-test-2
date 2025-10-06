import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { UsersList } from '../../../src/features/users/UsersList'
import { useAuth } from '../../../src/features/common/user'
import { TUserRowKeys } from '../../../src/features/users/containers/tables/AgentsListTable/UsersListTable'
import { userPermissions } from '../../../src/features/users/constants'

const AgentListPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:agents-list'))
  const { user } = useAuth()

  const columns = [
    'username',
    'email',
    'pbxName',
    'date',
    'edit',
    'delete',
    'campaigns',
    'block',
    'status',
  ].filter((col) => {
    if (col === 'edit' || col === 'delete') {
      return user?.permissions.includes(userPermissions[ERoles.AGENT][col])
    }
    return true
  }) as TUserRowKeys[]

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('agents_list')}>
        <UsersList role={ERoles.AGENT} columns={columns} />
      </CabinetLayout>
    </Permissions>
  )
}

export default AgentListPage
