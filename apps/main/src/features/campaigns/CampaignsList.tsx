import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'

import { Flex } from '@/components/Flex'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { CAMPAIGN_TABLE_TYPES, FILTER_TYPE } from '@/features/campaigns/constants'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { useCampaignsManager } from '@/features/campaigns/hooks/use-campaignsManager'
import { CampaignListTable } from '@/features/campaigns/containers/tables/CampaignListTable/CampaignListTable'
import { CampaignNameFilter } from '@/features/campaigns/containers/filters/CampaignNameFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { StatusFilter } from '@/features/campaigns/containers/filters/StatusFilter'
import { FeaturePermission } from '@/features/common/permissions/FeaturePermissions'
import { EManagerPermissions } from '@/constants/profile'
import { CampaignSearchField } from './components/CampaignSearchField'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/CampaignsList.styled'
import { asyncGetCampaignsList } from './store/campaigns'

const CreateCampaignModal = dynamic(
  () =>
    import('./containers/modals/CreateCampaignModal').then(
      (mod) => mod.CreateCampaignModal,
    ),
  {
    ssr: false,
  },
)

const DeleteCampaignModal = dynamic(
  () =>
    import('./containers/modals/DeleteCampaignModal').then(
      (mod) => mod.DeleteCampaignModal,
    ),
  {
    ssr: false,
  },
)

const EditCampaignModal = dynamic(
  () =>
    import('./containers/modals/EditCampaignModal').then((mod) => mod.EditCampaignModal),
  {
    ssr: false,
  },
)

const NewCampaignReviewModal = dynamic(
  () =>
    import('./containers/modals/NewCampaignReviewModal').then(
      (mod) => mod.NewCampaignReviewModal,
    ),
  {
    ssr: false,
  },
)

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState } = useModals()
  const {
    handleCreateCampaign,
    handleChangePage,
    handleChangeDate,
    pagination: { page, total, limit },
    filters,
    handlerResetFilters,
  } = useCampaignsManager(asyncGetCampaignsList)

  const reviewModalIsOpen =
    modalState?.modalName === MODAL_NAMES.REVIEW_CAMPAIGN && modalState.isOpen
  const createModalIsOpen =
    modalState?.modalName === MODAL_NAMES.CREATE_CAMPAIGN && modalState.isOpen

  return (
    <>
      <Container>
        <Panel>
          <Flex gap={16} align="center" width="100%">
            <CampaignSearchField placeholder={t('inputs:placeholder.search-campaign')} />
            <CampaignNameFilter type={CAMPAIGN_TABLE_TYPES.LIST} />
            <StatusFilter />
            <RangeDayPicker onChange={handleChangeDate} />
          </Flex>
          <FeaturePermission permissions={[EManagerPermissions.CREATE_CAMPAIGN]}>
            <FilledButton
              size="m"
              maxWidth="236px"
              width="100%"
              startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
              onClick={handleCreateCampaign}
            >
              {t('add-campaign')}
            </FilledButton>
          </FeaturePermission>
        </Panel>
        <Flex
          gap={16}
          align="center"
          styles={{
            display: Object.keys(filters).length === 0 ? 'none' : 'flex',
            marginTop: '12px',
          }}
        >
          {(filters.filterCampaignName ||
            filters.filterStatus ||
            (filters.filterDate?.from && filters.filterDate?.to)) && (
            <Flex gap="16px" align="center">
              {filters.filterCampaignName && (
                <PikedFilter
                  onClose={() => handlerResetFilters(FILTER_TYPE.CAMPAIGN_NAME)}
                >
                  {filters.filterCampaignName}
                </PikedFilter>
              )}
              {filters.filterStatus && (
                <PikedFilter onClose={() => handlerResetFilters(FILTER_TYPE.STATUS)}>
                  {t(`statuses.${filters.filterStatus}`)}
                </PikedFilter>
              )}
            </Flex>
          )}
          <OutlinedButton size="s" onClick={() => handlerResetFilters(FILTER_TYPE.ALL)}>
            {t('reset-filters')}
          </OutlinedButton>
        </Flex>
        <TableContainer>
          <CampaignListTable />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
            currentPage={page}
            onChange={handleChangePage}
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
