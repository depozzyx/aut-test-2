import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { InitLoader } from '../user/InitLoader'
import { useAuth } from '../user'

export const PermissionAuth: React.FC = ({ children }) => {
  const { user, userFetching } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    if (userFetching) return
    if (user) {
      replace(ROUTES.HOME)
    }
  })

  return (
    <>
      <InitLoader />
      {children}
    </>
  )
}
