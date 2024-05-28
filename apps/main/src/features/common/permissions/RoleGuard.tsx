import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '../user'

type TProps = {
  children: JSX.Element
  roles: string[]
}

const REPLACE_ROUTES = {
  admin: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS,
  agent: ROUTES.CALLS,
  manager: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS,
}

export const RoleGuard = ({ children, roles }: TProps): JSX.Element => {
  const { replace } = useRouter()
  const { user, userFetching } = useAuth()

  useEffect(() => {
    if (!user) return
    const hasRole = roles.some((role) => user.role.includes(role))
    if (!hasRole) {
      replace(REPLACE_ROUTES[user.role])
    }
  }, [userFetching, user])

  return <>{children}</>
}
