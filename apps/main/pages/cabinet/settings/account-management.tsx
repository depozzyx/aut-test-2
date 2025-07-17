import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useMount, useTitle } from 'react-use'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { UserData } from '@/features/settings/UserData'
import { ChangePassword } from '@/features/settings/ChangePassword'
import { ERoles } from '@/constants/profile'
import { agentActions, agentStatusSelector } from '@/features/common/agentStatus/store'
import { useRedux } from '@/hooks/use-redux'
import { useAuth } from '@/features/common/user'
import { USER_ROLES } from '@/types/roles'

const AccountManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:account-management'))

  const { dispatch, select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)
  const { user } = useAuth()

  useMount(() => {
    if (
      user?.role === ERoles.AGENT &&
      !['offline', 'finish', 'pause'].includes(pbxStatus.status)
    ) {
      setTimeout(() => {
        dispatch(agentActions.setStatusAsync('pause', 'manual'))
      }, 500)
    }
  })
  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER, ERoles.AGENT]}>
      <CabinetLayout title={t('settings_account_management')}>
        {user?.role !== USER_ROLES.AGENT && <UserData />}
        <ChangePassword />
      </CabinetLayout>
    </Permissions>
  )
}

export default AccountManagementPage
