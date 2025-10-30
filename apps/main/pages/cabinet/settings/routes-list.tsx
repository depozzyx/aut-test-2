import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { RoutesList } from '@/features/routes/RoutesList'

const RoutesPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:routes-list'))

  return (
    <Permissions roles={[ERoles.SUPERADMIN]}>
      <CabinetLayout title={t('settings_routes_management')}>
        <RoutesList />
      </CabinetLayout>
    </Permissions>
  )
}

export default RoutesPage
