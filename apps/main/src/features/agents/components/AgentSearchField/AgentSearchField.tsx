import useTranslation from 'next-translate/useTranslation'
import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'

export const AgentSearchField = (): JSX.Element => {
  const { t } = useTranslation('inputs')

  return (
    <Input
      width={374}
      size="xs"
      name="search-agent"
      placeholder={t('placeholder.search-agent')}
      startAdornment={<SearchFieldIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
    />
  )
}
