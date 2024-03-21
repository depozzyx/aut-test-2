import { useState } from 'react'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { authorized } from '@/browser-api/authorized'
import { apiAuth } from '@/api-rest/auth'
import { userActions } from '@/features/common/user'
import { TLogInReq } from '@/api-rest/auth/types'

type TReturn = {
  logIn: (key: TLogInReq) => void
  fetching: boolean
  error: boolean
}

type TUseTelegram = () => TReturn

export const useTelegram: TUseTelegram = () => {
  const { dispatch } = useRedux()
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(false)

  const logIn = async (key: TLogInReq) => {
    try {
      await apiAuth.loginTelegram(key)
      authorized.set()

      dispatch(userActions.getProfile())
    } catch (e) {
      setError(true)
      handleRestError({
        e,
        dispatch,
      })
    } finally {
      setFetching(false)
    }
  }

  return { fetching, error, logIn }
}
