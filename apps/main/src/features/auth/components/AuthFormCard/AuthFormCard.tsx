import { FC } from 'react'
import { Card } from '@peiko/components/Card'
import { useTheme } from 'styled-components'
import { Logo } from '../Logo'

interface IAuthCardProps {
  maxWidth?: number
  padding?: string
}

export const AuthFormCard: FC<IAuthCardProps> = ({ children, maxWidth, padding }) => {
  const theme = useTheme()

  return (
    <Card
      padding={padding || '32px 48px'}
      maxWidth={maxWidth}
      bgColor="base"
      boxShadow={theme.shadow.table}
      fullWidth
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
