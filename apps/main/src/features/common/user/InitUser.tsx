import { FC, useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { userActions } from './store'

export const InitUser: FC = () => {
  const { dispatch } = useRedux()

  useEffect(() => {
    dispatch(userActions.getProfile())
  }, [])

  return null
}
