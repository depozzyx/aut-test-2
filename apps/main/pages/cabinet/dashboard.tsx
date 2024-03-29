import { NextPage } from 'next'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useAuth } from '@/features/common/user'
import { Permissions } from '@/features/common/permissions/Permissions'

const Dashboard: NextPage = () => {
  const text = 'Dashboard'
  const btnText = 'Logout'
  const { logoutAsync } = useAuth()

  const handleLogout = () => {
    logoutAsync()
  }

  return (
    <Permissions>
      {text}
      <FilledButton onClick={handleLogout}>{btnText}</FilledButton>
    </Permissions>
  )
}

export default Dashboard
