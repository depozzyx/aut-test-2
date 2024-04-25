import React, { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { ROUTES } from '@/constants/routes'
import { NotFoundIcon } from '@peiko/components/icons/NotFoundIcon'
import { ServerErrorIcon } from '@peiko/components/icons/ServerErrorIcon'
import { useRouter } from 'next/router'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'

type TErrorPageProps = {
  status: 404 | 500 | null
}

export const ErrorPage: FC<TErrorPageProps> = ({ status }) => {
  const router = useRouter()
  const { t } = useTranslation('error')

  if (!status) return null

  const ErrorIcon =
    status === 404 ? (
      <NotFoundIcon width="378px" height="149px" />
    ) : (
      <ServerErrorIcon width="362px" height="149px" />
    )

  const errorText = status === 404 ? t('404') : t('500')

  const handleGoBack = () => router.back()

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={60}
      width="100%"
      height="100%"
    >
      <Flex direction="column" align="center" justify="center" gap={24}>
        {ErrorIcon}
        <Text variant="f2" color="main5">
          {errorText}
        </Text>
      </Flex>
      <Flex gap={24} align="center" justify="center" width={496}>
        <FilledButton width="100%" size="l" link={{ href: ROUTES.SIGN_IN }}>
          {t('routing:home')}
        </FilledButton>
        <FilledButton size="l" width="100%" onClick={handleGoBack}>
          {t('routing:go-back')}
        </FilledButton>
      </Flex>
    </Flex>
  )
}
