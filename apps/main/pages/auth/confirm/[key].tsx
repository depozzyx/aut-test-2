import type { NextPage } from 'next'
import { AuthLayout } from '@/layout/AuthLayout'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'
import { Confirmation } from '@/features/auth/Confirmation'

const ConfirmationPage: NextPage = () => (
  <PermissionAuth>
    <AuthLayout>
      <Confirmation />
    </AuthLayout>
  </PermissionAuth>
)

export default ConfirmationPage
