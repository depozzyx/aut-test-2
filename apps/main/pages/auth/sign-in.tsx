import type { NextPage } from 'next'
import { BaseLayout } from '@/layout/BaseLayout'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'
import { SignIn } from '../../src/features/auth/SignIn'

const SignInPage: NextPage = () => (
  <PermissionAuth>
    <BaseLayout>
      <SignIn />
    </BaseLayout>
  </PermissionAuth>
)

export default SignInPage
