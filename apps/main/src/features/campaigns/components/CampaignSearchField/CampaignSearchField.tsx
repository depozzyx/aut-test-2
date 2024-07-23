import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'
import { useRedux } from '@/hooks/use-redux'
import { setSearchTerm } from '../../store/campaigns'

type TProps = {
  placeholder: string
  maxWidth?: string
}

export const CampaignSearchField = ({
  placeholder,
  maxWidth = '374px',
}: TProps): JSX.Element => {
  const { dispatch } = useRedux()

  const handleOnChange = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  return (
    <Input
      width="100%"
      maxWidth={maxWidth}
      size="s"
      name="search-campaign"
      placeholder={placeholder}
      startAdornment={<SearchFieldIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
      onChange={handleOnChange}
      debounce={600}
    />
  )
}
