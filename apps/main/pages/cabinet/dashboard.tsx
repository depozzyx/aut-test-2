import { NextPage } from 'next'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'

const DashboardPage: NextPage = () => {
  const text = 'Dashboard'

  return (
    <Permissions>
      <CabinetLayout>{text}</CabinetLayout>
    </Permissions>
  )
}

export default DashboardPage
