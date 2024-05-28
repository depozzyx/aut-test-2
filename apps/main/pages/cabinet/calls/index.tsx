import { NextPage } from 'next'
import { useTitle } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'

const CallsPage: NextPage = () => {
  const { t } = useTranslation('routing')
  useTitle(t('page-titles:calls'))

  return (
    <Permissions>
      <CabinetLayout title={t('calls')} />
    </Permissions>
  )
}

export default CallsPage
