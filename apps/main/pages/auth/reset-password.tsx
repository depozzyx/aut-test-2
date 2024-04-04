import { AuthLayout } from '@/layout/AuthLayout'
import { NextPage } from 'next'
import { ResetPassword } from '@/features/auth/ResetPassword'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'

const ResetPasswordPage: NextPage = () => (
  <PermissionAuth>
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  </PermissionAuth>
)

export default ResetPasswordPage
