import React, { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'

type TErrorPageProps = {
  status: 404 | 500 | null
}

export const ErrorPage: FC<TErrorPageProps> = ({ status }) => {
  const { t } = useTranslation('error')

  return (
    <>
      <Text>{status === 404 ? t('404-desc') : t('500-desc')}</Text>
    </>
  )
}
