import React, { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { NextLink } from '@peiko/components/links/NextLink'
import { ROUTES } from '@/constants/routes'
import { NotFoundIcon } from '@peiko/components/icons/NotFoundIcon'
import { ServerErrorIcon } from '@peiko/components/icons/ServerErrorIcon'
import {
  Container,
  ErrorText,
  Content,
  ActionsContainer,
} from '@/features/common/error/styles/PageError.styled'
import { useRouter } from 'next/router'

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
    <Container>
      <Content>
        {ErrorIcon}
        <ErrorText>{errorText}</ErrorText>
      </Content>
      <ActionsContainer>
        <NextLink href={ROUTES.HOME}>
          <FilledButton size="l">{t('routing:home')}</FilledButton>
        </NextLink>
        <FilledButton size="l" onClick={handleGoBack}>
          {t('routing:go-back')}
        </FilledButton>
      </ActionsContainer>
    </Container>
  )
}
