import { FC } from 'react'
import { Loader } from '@peiko/components/loaders/Loader'
import { useAuth } from './hooks/use-auth'

export const InitLoader: FC = () => {
  const { userFetching } = useAuth()

  if (userFetching) {
    return <Loader width="64px" height="64px" />
  }

  return null
}
