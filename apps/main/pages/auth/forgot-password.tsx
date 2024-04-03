import { AuthLayout } from '@/layout/AuthLayout'
import { ForgotPassword } from '@/features/auth/ForgotPassword'
import { NextPage } from 'next'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'

const ForgotPasswordPage: NextPage = () => (
  <PermissionAuth>
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  </PermissionAuth>
)

export default ForgotPasswordPage
