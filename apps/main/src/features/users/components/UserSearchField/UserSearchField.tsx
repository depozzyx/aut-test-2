import useTranslation from 'next-translate/useTranslation'
import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'
import { useRedux } from '@/hooks/use-redux'
import { selectSearchTerm, setSearchTerm } from '@/features/users/store/users'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'

export const UserSearchField = (): JSX.Element => {
  const { t } = useTranslation('inputs')
  const { dispatch } = useRedux()

  const searchTerm = useRedux().select(selectSearchTerm)
  const handleOnChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  return (
    <Input
      value={searchTerm}
      width="100%"
      maxWidth="374px"
      size="xs"
      name="search-user"
      placeholder={t('placeholder.search-user')}
      startAdornment={<SearchFieldIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
      endAdornment={
        <BaseButton onClick={() => handleOnChange('')} startIcon={<CloseIcon />} />
      }
      onChange={handleOnChange}
      debounce={600}
    />
  )
}
