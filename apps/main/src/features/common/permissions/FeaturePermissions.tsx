import { useEffect, useState } from 'react'
import { TUserPermissions } from '@/types/permissions'
import { useAuth } from '../user'

type TProps = {
  children: JSX.Element
  permissions: TUserPermissions[]
}

export const FeaturePermission = ({
  children,
  permissions,
}: TProps): JSX.Element | null => {
  const { user } = useAuth()
  const [show, setSHow] = useState(false)

  useEffect(() => {
    if (!user) return

    const hasPermission = permissions.some((permission) =>
      user.permissions.includes(permission),
    )

    if (hasPermission) setSHow(true)
  }, [user])

  if (!show) return null

  return children
}
