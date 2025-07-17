import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { ApiKeyManagement } from '@/features/settings/ApiKeyManagement'

const ApiKeyManagementPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:api-key-management'))

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('settings_api_key_management')}>
        <ApiKeyManagement />
      </CabinetLayout>
    </Permissions>
  )
}

export default ApiKeyManagementPage
