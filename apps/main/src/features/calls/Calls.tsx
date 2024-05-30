import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { Wrapper, PopupOverlay } from './Calls.styled'

export const Calls = (): JSX.Element => {
  const { t } = useTranslation('calls')

  return (
    <Wrapper>
      <PopupOverlay id="customPopupOverlay" />
      <Text variant="f2">{t('title')}</Text>
    </Wrapper>
  )
}
