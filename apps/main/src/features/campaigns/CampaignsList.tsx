import { useCallback, useEffect } from 'react'
import { useUnmount } from 'react-use'
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
import { StatusFilter } from '@/components/StatusFilter'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { CampaignsSelect } from '@/features/campaigns/containers/CampaignSelect'
import { CampaignSearchField } from './components/CampaignSearchField'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/CampaignsList.styled'
import { CampaignListTable } from './containers/CampaignListTable/CampaignListTable'
import {
  selectCampaignsPagination,
  reset,
  asyncGetCampaignsList,
  selectSearchTerm,
  asyncGetActiveCampaigns,
  selectFilterCampaignName,
} from './store/campaigns'
import { DeleteCampaignModal } from './containers/DeleteCampaignModal'
import { CreateCampaignModal } from './containers/CreateCampaignModal'
import { EditCampaignModal } from './containers/EditCampaignModal'
import { NewCampaignReviewModal } from './containers/NewCampaignReviewModal'

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select, dispatch } = useRedux()
  const { modalState, setModal } = useModals()
  const {
    pagination: { total, page, limit },
    searchTerm,
    filterCampaignName,
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      searchTerm: selectSearchTerm,
      filterCampaignName: selectFilterCampaignName,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(
      asyncGetCampaignsList({
        page,
        limit,
        orderBy: 'ASC',
        search: searchTerm,
        name: filterCampaignName,
      }),
    )
  }, [page, searchTerm, filterCampaignName])

  useUnmount(() => {
    dispatch(reset())
  })

  const handleCreateCampaign = useCallback(() => {
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }, [])

  const reviewModalIsOpen =
    modalState?.modalName === MODAL_NAMES.REVIEW_CAMPAIGN && modalState.isOpen
  const createModalIsOpen =
    modalState?.modalName === MODAL_NAMES.CREATE_CAMPAIGN && modalState.isOpen

  const changePageHandler = useCallback((page: number) => {
    dispatch(asyncGetActiveCampaigns({ page, limit, orderBy: 'ASC', search: searchTerm }))
  }, [])

  return (
    <>
      <Container>
        <Panel>
          <Flex gap={16} align="center" width="100%">
            <CampaignSearchField />
            <CampaignsSelect type={CAMPAIGN_TABLE_TYPES.LIST} />
            <StatusFilter />
          </Flex>
          <FilledButton
            size="m"
            maxWidth="236px"
            width="100%"
            startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
            onClick={handleCreateCampaign}
          >
            {t('add-campaign')}
          </FilledButton>
        </Panel>
        <TableContainer>
          <CampaignListTable />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
            currentPage={page}
            onChange={changePageHandler}
          />
        </PaginationContainer>
      </Container>
      <EditCampaignModal type={CAMPAIGN_TABLE_TYPES.LIST} />
      <DeleteCampaignModal type={CAMPAIGN_TABLE_TYPES.LIST} />
      {createModalIsOpen && <CreateCampaignModal />}
      {reviewModalIsOpen && <NewCampaignReviewModal type={CAMPAIGN_TABLE_TYPES.LIST} />}
    </>
  )
}
