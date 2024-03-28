import { AuthLayout } from '@/layout/AuthLayout'
import { ResetPassword } from '@/features/auth/ResetPassword'
import { NextPage } from 'next'

const ForgotPasswordPage: NextPage = () => (
  <AuthLayout>
    <ResetPassword />
  </AuthLayout>
)

export default ForgotPasswordPage
