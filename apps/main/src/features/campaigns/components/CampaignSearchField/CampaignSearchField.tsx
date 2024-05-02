import useTranslation from 'next-translate/useTranslation'
import { Input } from '@peiko/components/inputs/Input'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'

export const CampaignSearchField = (): JSX.Element => {
  const { t } = useTranslation('inputs')

  return (
    <Input
      width="100%"
      maxWidth="374px"
      size="xs"
      name="search-campaign"
      placeholder={t('placeholder.search-campaign')}
      startAdornment={<SearchFieldIcon />}
      startAdornmentStyles={{ paddingRight: '0 !important' }}
    />
  )
}
