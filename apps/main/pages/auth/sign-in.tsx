import { NextPage } from 'next'
import { AuthLayout } from '@/layout/AuthLayout'
import { SignIn } from '@/features/auth/SignIn'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'

const SignInPage: NextPage = () => (
  <PermissionAuth>
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  </PermissionAuth>
)

export default SignInPage
