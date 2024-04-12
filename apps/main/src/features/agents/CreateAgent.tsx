import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'

export const CreateAgent = (): JSX.Element => {
  const { t } = useTranslation('agents')

  return <Flex>{t('create-agent.title')}</Flex>
}
