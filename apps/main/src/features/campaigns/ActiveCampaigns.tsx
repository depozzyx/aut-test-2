import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'

import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Flex } from '@/components/Flex'
import { DashboardTabs } from '@/components/DashboardTabs'
import { Pagination } from '@peiko/components/Pagination'
import { CAMPAIGN_TABLE_TYPES, FILTER_TYPE } from '@/features/campaigns/constants'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { useCampaignUpdates } from '@/features/campaigns/hooks/use-active-campaigns-update'
import { ActiveCampaignsTable } from './containers/tables/ActiveCampaignsTable'
import { CampaignNameFilter } from './containers/filters/CampaignNameFilter'
import { useCampaignsManager } from './hooks/use-campaignsManager'
import { CampaignSearchField } from './components/CampaignSearchField'
import { asyncGetActiveCampaigns } from './store/campaigns'

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

export const ActiveCampaigns = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState } = useModals()

  useCampaignUpdates()

  const {
    handleChangePage,
    handleChangeDate,
    pagination: { page, total, limit },
    filters,
    handlerResetFilters,
  } = useCampaignsManager(asyncGetActiveCampaigns)

  const reviewModalIsOpen =
    modalState?.modalName === MODAL_NAMES.REVIEW_CAMPAIGN && modalState.isOpen
  const createModalIsOpen =
    modalState?.modalName === MODAL_NAMES.CREATE_CAMPAIGN && modalState.isOpen

  return (
    <>
      <Flex direction="column" padding="12px 0 0 0">
        <DashboardTabs />
        <Flex padding="12px 0 0 0" justify="space-between">
          <Flex gap={16} align="center" width="100%" padding="0 16px 0 0">
            <CampaignSearchField placeholder={t('inputs:placeholder.search-campaign')} />
            <CampaignNameFilter type={CAMPAIGN_TABLE_TYPES.ACTIVE} />
            <RangeDayPicker onChange={handleChangeDate} />
          </Flex>
        </Flex>
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
            </Flex>
          )}
          <OutlinedButton size="s" onClick={() => handlerResetFilters(FILTER_TYPE.ALL)}>
            {t('reset-filters')}
          </OutlinedButton>
        </Flex>
        <ActiveCampaignsTable />
        <Flex padding="40px 0 0 0" justify="center">
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
      <EditCampaignModal type={CAMPAIGN_TABLE_TYPES.LIST} />
      <DeleteCampaignModal type={CAMPAIGN_TABLE_TYPES.ACTIVE} />
      {createModalIsOpen && <CreateCampaignModal />}
      {reviewModalIsOpen && <NewCampaignReviewModal type={CAMPAIGN_TABLE_TYPES.ACTIVE} />}
    </>
  )
}
