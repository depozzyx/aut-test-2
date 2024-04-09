import useTranslation from 'next-translate/useTranslation'
import { Input } from '@peiko/components/inputs/Input'
import { StyledSearchIcon } from './SearchField.styled'

export const SearchField = (): JSX.Element => {
  const { t } = useTranslation('inputs')

  return (
    <Input
      width={374}
      name="search"
      placeholder={t('placeholder.search')}
      startAdornment={<StyledSearchIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
    />
  )
}
