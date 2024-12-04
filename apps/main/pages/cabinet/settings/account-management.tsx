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

const AccountManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:account-management'))

  const { dispatch, select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)
  const { user } = useAuth()

  useMount(() => {
    if (
      user?.role === ERoles.AGENT &&
      !['offline', 'finish', 'pause', 'manual_pause'].includes(pbxStatus)
    ) {
      setTimeout(() => {
        dispatch(agentActions.setStatusAsync('pause'))
      }, 500)
    }
  })
  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER, ERoles.AGENT]}>
      <CabinetLayout title={t('settings_account_management')}>
        <UserData />
        <ChangePassword />
      </CabinetLayout>
    </Permissions>
  )
}

export default AccountManagementPage
