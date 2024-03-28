import { NextPage } from 'next'
import { AuthLayout } from '@/layout/AuthLayout'
import { SignIn } from '@/features/auth/SignIn'

const SignInPage: NextPage = () => (
  <AuthLayout>
    <SignIn />
  </AuthLayout>
)

export default SignInPage
