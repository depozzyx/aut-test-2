import type { NextPage } from 'next'
import { BaseLayout } from '@/layout/BaseLayout'
import { SignUp } from '@/features/auth/SignUp'
import { PermissionAuth } from '@/features/common/permissions/PermissionAuth'

const SignUpPage: NextPage = () => (
  <PermissionAuth>
    <BaseLayout>
      <SignUp />
    </BaseLayout>
  </PermissionAuth>
)

export default SignUpPage
