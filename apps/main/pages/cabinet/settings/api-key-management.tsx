import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'

const ApiKeyManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('settings_account_management')} />
    </Permissions>
  )
}

export default ApiKeyManagementPage
