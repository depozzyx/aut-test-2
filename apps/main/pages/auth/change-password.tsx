import { AuthLayout } from '@/layout/AuthLayout'
import { NextPage } from 'next'
import { ChangePassword } from '@/features/auth/ChangePassword'

const ChangePasswordPage: NextPage = () => (
  <AuthLayout>
    <ChangePassword />
  </AuthLayout>
)

export default ChangePasswordPage
