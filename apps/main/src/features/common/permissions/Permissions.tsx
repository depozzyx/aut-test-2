import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { RoleGuard } from '@/features/common/permissions/RoleGuard'
import { InitLoader } from '../user/InitLoader'
import { useAuth } from '../user'
import { AgentLogout } from '../agentStatus/AgentLogout'

type TProps = {
  children: JSX.Element
  roles: string[]
}

export const Permissions: React.FC<TProps> = ({ children, roles }) => {
  const { user, userFetching } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    if (userFetching) return
    if (!user) {
      replace(ROUTES.SIGN_IN)
    }
  }, [user, userFetching])

  if (userFetching) {
    return <InitLoader />
  }

  return (
    <RoleGuard roles={roles} user={user}>
      <>
        {user?.role === 'agent' && <AgentLogout />}
        {user && children}
      </>
    </RoleGuard>
  )
}
