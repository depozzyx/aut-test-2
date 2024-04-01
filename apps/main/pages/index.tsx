import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/common/user'

const Home: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) router.replace(ROUTES.SIGN_IN)

    router.replace(ROUTES.CABINET_DASHBOARD)
  }, [router, user])

  return null
}

export default Home
