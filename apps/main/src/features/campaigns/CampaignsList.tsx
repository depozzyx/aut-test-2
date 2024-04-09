import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { SearchField } from './components/SearchField'
import {
  Container,
  Panel,
  CustomFilterBtn,
  TableContainer,
  PaginationContainer,
} from './styles/CampaignsList.styled'
import { CampaignListTable } from './containers/CampaignListTable/CampaignListTable'
import { selectCampaignsPagination } from './store/campaigns-list'

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select } = useRedux()

  const pagination = select(selectCampaignsPagination)

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
      <TableContainer>
        <CampaignListTable />
      </TableContainer>
      <PaginationContainer>
        <Pagination lastPage={pagination.total} currentPage={pagination.page} />
      </PaginationContainer>
    </Container>
  )
}
