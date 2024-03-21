import type { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { BaseLayout } from '@/layout/BaseLayout'

const Home: NextPage = () => {
  const { t } = useTranslation('auth')

  return <BaseLayout> {t('view-more')}</BaseLayout>
}

export default Home
