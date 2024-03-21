import { FC } from 'react'
import { Loader } from '@peiko/components/loaders/Loader'
import { useAuth } from './hooks/use-auth'

export const InitLoader: FC = () => {
  const { userFetching } = useAuth()

  if (userFetching) {
    return <Loader width="32px" height="32px" />
  }

  return null
}
