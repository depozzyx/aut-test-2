import { useCallback } from 'react'
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
  selectCampaignsList,
  setSelectedId,
  setCampaignStatus,
  reset,
} from './store/campaigns'
import { DeleteCampaignModal } from './containers/DeleteCampaignModal'
import { CreateCampaignModal } from './containers/CreateCampaignModal'
import { EditCampaignModal } from './containers/EditCampaignModal'
import { NewCampaignReviewModal } from './containers/NewCampaignReviewModal'

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  useUnmount(() => {
    dispatch(reset())
  })

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

  const handleAction = useCallback((id: number) => {
    dispatch(setCampaignStatus(id))
  }, [])

  const handleCreateCampaign = useCallback(() => {
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }, [])

  const handleEditCampaign = useCallback(() => {
    setModal({ modalName: MODAL_NAMES.EDIT_CAMPAIGN, isOpen: true })
  }, [])

  return (
    <>
      <Container>
        <Panel>
          <Flex gap={16} align="center">
            <CampaignSearchField />
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
          <CampaignListTable
            data={campaignList}
            onDelete={handleDelete}
            changeStatus={handleAction}
            editCampaign={handleEditCampaign}
          />
        </TableContainer>
        <PaginationContainer>
          <Pagination lastPage={total} currentPage={page} />
        </PaginationContainer>
      </Container>
      <CreateCampaignModal />
      <EditCampaignModal />
      <DeleteCampaignModal />
      <NewCampaignReviewModal />
    </>
  )
}
