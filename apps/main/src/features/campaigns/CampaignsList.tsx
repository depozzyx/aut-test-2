import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { SearchField } from './components/SearchField'
import { Container, Panel, CustomFilterBtn } from './styles/CampaignsList.styled'

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const [searchValue] = useState<string>('')

  return (
    <Container>
      <Panel>
        <Flex gap={16}>
          <SearchField searchValue={searchValue} />
          <CustomFilterBtn size="sm" iconColor="main3" />
        </Flex>
        <FilledButton
          size="m"
          maxWidth="236px"
          width="100%"
          startIcon={<PlusIcon width="24px" height="24px" />}
        >
          {t('add-campaign')}
        </FilledButton>
      </Panel>
    </Container>
  )
}
