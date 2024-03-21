import { NextPage } from 'next'
import { AuthLayout } from '@/layout/AuthLayout'
import { ErrorPage } from '@/features/common/error'

const NotFoundPage: NextPage = () => (
  <AuthLayout justifyContent="center">
    <ErrorPage status={500} />
  </AuthLayout>
)

export default NotFoundPage
