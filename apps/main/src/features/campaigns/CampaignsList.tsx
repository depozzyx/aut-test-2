import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import useModals from '@/features/common/modals/hooks/use-modals'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { SearchField } from './components/SearchField'
import {
  Container,
  Panel,
  CustomFilterBtn,
  TableContainer,
  PaginationContainer,
} from './styles/CampaignsList.styled'
import { CampaignListTable } from './containers/CampaignListTable/CampaignListTable'
import {
  selectCampaignsPagination,
  selectCampaignsList,
  setSelectedId,
} from './store/campaigns-list'
import { DeleteCampaignModal } from './containers/DeleteCampaignModal'

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const {
    pagination: { total, page },
    campaignList,
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      campaignList: selectCampaignsList,
    }),
    shallowEqual,
  )

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_CAMPAIGN, isOpen: true })
  }, [])

  return (
    <>
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
          <CampaignListTable data={campaignList} onDelete={handleDelete} />
        </TableContainer>
        <PaginationContainer>
          <Pagination lastPage={total} currentPage={page} />
        </PaginationContainer>
      </Container>
      <DeleteCampaignModal />
    </>
  )
}
