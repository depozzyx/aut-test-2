import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { BaseImage } from '@peiko/components/BaseImage'
import { Text } from '@peiko/components/Text'
import { LogoWrapper } from './Logo.styled'

const logo = '/images/logo.png'

export const Logo: FC = () => {
  const { t } = useTranslation('common')

  return (
    <LogoWrapper>
      <BaseImage src={logo} width={146} height={50} />
      <Text variant="f8">{t('logo-name')}</Text>
    </LogoWrapper>
  )
}
