import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'
import { useRedux } from '@/hooks/use-redux'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { setSearchTerm, selectSearchTerm } from '../../store/campaigns'

type TProps = {
  placeholder: string
  maxWidth?: string
  disabled?: boolean
}

export const CampaignSearchField = ({
  placeholder,
  maxWidth = '374px',
  disabled,
}: TProps): JSX.Element => {
  const { select, dispatch } = useRedux()

  const searchTerm = select(selectSearchTerm)

  const handleOnChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  return (
    <Input
      width="100%"
      maxWidth={maxWidth}
      disabled={disabled}
      size="s"
      value={searchTerm}
      name="search-campaign"
      placeholder={placeholder}
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
