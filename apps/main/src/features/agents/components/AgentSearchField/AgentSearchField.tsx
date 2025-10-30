import useTranslation from 'next-translate/useTranslation'
import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'
import { useRedux } from '@/hooks/use-redux'
import { selectSearchTerm, setSearchTerm } from '@/features/agents/store/agents'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'

export const AgentSearchField = (): JSX.Element => {
  const { t } = useTranslation('inputs')
  const { dispatch, select } = useRedux()

  const searchTerm = select(selectSearchTerm)

  const handleOnChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  return (
    <Input
      width="100%"
      maxWidth="374px"
      size="xs"
      name="search-agent"
      value={searchTerm}
      placeholder={t('placeholder.search-agent')}
      startAdornment={<SearchFieldIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
      endAdornment={
        <BaseButton
          onClick={() => handleOnChange('')}
          disabled={!searchTerm}
          startIcon={<CloseIcon />}
        />
      }
      onChange={handleOnChange}
      debounce={600}
    />
  )
}
