import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { SearchField } from './components/SearchField'
import { Container, Panel, CustomFilterBtn } from './styles/CampaignsList.styled'

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')

  return (
    <Container>
      <Panel>
        <Flex gap={16}>
          <SearchField />
          <CustomFilterBtn />
        </Flex>
        <FilledButton
          size="m"
          maxWidth="236px"
          width="100%"
          startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
        >
          {t('add-campaign')}
        </FilledButton>
      </Panel>
    </Container>
  )
}
