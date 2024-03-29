import { AuthLayout } from '@/layout/AuthLayout'
import { ResetPassword } from '@/features/auth/ResetPassword'
import { NextPage } from 'next'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'

const ForgotPasswordPage: NextPage = () => (
  <PermissionAuth>
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  </PermissionAuth>
)

export default ForgotPasswordPage
