import { NextPage } from 'next'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'

const CallsPage: NextPage = () => {
  const text = 'Calls'
  return (
    <Permissions>
      <CabinetLayout>{text}</CabinetLayout>
    </Permissions>
  )
}

export default CallsPage
