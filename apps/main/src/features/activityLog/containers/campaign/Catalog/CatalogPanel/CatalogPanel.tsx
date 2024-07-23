import useTranslation from 'next-translate/useTranslation'
import { CampaignSearchField } from '@/features/campaigns/components/CampaignSearchField'
import { DateSortField } from '../DateSortField'
import { Container } from './CatalogPanel.styled'

export const CatalogPanel = (): JSX.Element => {
  const { t } = useTranslation('inputs')

  return (
    <Container>
      <CampaignSearchField placeholder={t('placeholder.short-search')} />
      <DateSortField />
    </Container>
  )
}
