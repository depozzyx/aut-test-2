import { FC } from 'react'
import { Card } from '@peiko/components/Card'
import { useTheme } from 'styled-components'
import { Logo } from '../Logo'

interface IAuthCardProps {
  maxWidth?: number
}

export const AuthFormCard: FC<IAuthCardProps> = ({ children, maxWidth }) => {
  const theme = useTheme()

  return (
    <Card
      padding="32px 48px"
      maxWidth={maxWidth}
      bgColor="base"
      boxShadow={theme.shadow.table}
      styles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '56px',
      }}
    >
      <Logo />
      {children}
    </Card>
  )
}
