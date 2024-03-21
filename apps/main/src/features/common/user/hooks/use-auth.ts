import { useRedux } from '@/hooks/use-redux'
import { TInit, userActions, userSelectors } from '../store'

type TUseProfileData = TInit & {
  logout: () => void
  logoutAsync: () => void
  getProfile: () => void
}

export const useAuth = (): TUseProfileData => {
  const { select, dispatch } = useRedux()
  const auth = select(userSelectors.user)
  const logout = () => dispatch(userActions.logout())
  const logoutAsync = () => dispatch(userActions.logoutAsync())
  const getProfile = () => dispatch(userActions.getProfile())

  return { ...auth, logout, logoutAsync, getProfile }
}
