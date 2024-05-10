import useTranslation from 'next-translate/useTranslation'
import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'
import { useRedux } from '@/hooks/use-redux'
import { setSearchTerm } from '@/features/agents/store/agents'

export const AgentSearchField = (): JSX.Element => {
  const { t } = useTranslation('inputs')
  const { dispatch } = useRedux()

  const handleOnChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  return (
    <Input
      width="100%"
      maxWidth="374px"
      size="xs"
      name="search-agent"
      placeholder={t('placeholder.search-agent')}
      startAdornment={<SearchFieldIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
      onChange={handleOnChange}
      debounce={600}
    />
  )
}
