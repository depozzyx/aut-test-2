import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { UserData } from '@/features/settings/UserData'
import { ChangePassword } from '@/features/settings/ChangePassword'

const AccountManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions>
      <CabinetLayout title={t('settings_account_management')}>
        <UserData />
        <ChangePassword />
      </CabinetLayout>
    </Permissions>
  )
}

export default AccountManagementPage
