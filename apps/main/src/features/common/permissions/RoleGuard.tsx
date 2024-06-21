import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { TProfile } from '@/types/entities/profile'

type TProps = {
  children: JSX.Element | null
  roles: string[]
  user: TProfile | null
}

const REPLACE_ROUTES = {
  admin: ROUTES.MANAGERS_LIST,
  agent: ROUTES.AGENT_CALLS,
  manager: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS,
}

export const RoleGuard = ({ children, roles, user }: TProps): JSX.Element => {
  const { replace } = useRouter()
  const [hasRole, setHasRole] = useState<boolean>(false)

  useEffect(() => {
    if (!user) return
    const hasRole = roles?.some((role) => user.role.includes(role))
    if (!hasRole) {
      replace(REPLACE_ROUTES[user.role])
    }
    setHasRole(hasRole)
  }, [user])

  return <>{hasRole && children}</>
}
