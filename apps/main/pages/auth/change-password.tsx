import { AuthLayout } from '@/layout/AuthLayout'
import { NextPage } from 'next'
import { ChangePassword } from '@/features/auth/ChangePassword'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'

const ChangePasswordPage: NextPage = () => (
  <PermissionAuth>
    <AuthLayout>
      <ChangePassword />
    </AuthLayout>
  </PermissionAuth>
)

export default ChangePasswordPage
