import { NextPage } from 'next'
import { AuthLayout } from '@/layout/AuthLayout'
import { SignInForm } from '@/features/auth/SignInForm'

const SignInPage: NextPage = () => (
  <AuthLayout>
    <SignInForm />
  </AuthLayout>
)

export default SignInPage
