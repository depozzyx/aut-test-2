import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { ActiveCampaignsTable } from 'features/campaigns/containers/tables/ActiveCampaignsTable'
import { DashboardTabs } from '@/components/DashboardTabs'
import { Pagination } from '@peiko/components/Pagination'
import { CAMPAIGN_TABLE_TYPES, FILTER_TYPE } from '@/features/campaigns/constants'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { useCampaignsManager } from '@/features/campaigns/hooks/use-campaignsManager'
import { CampaignNameFilter } from '@/features/campaigns/containers/filters/CampaignNameFilter'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { EditCampaignModal } from '@/features/campaigns/containers/modals/EditCampaignModal'
import { EManagerPermissions } from '@/constants/profile'
import { FeaturePermission } from '@/features/common/permissions/FeaturePermissions'
import { CreateCampaignModal } from './containers/modals/CreateCampaignModal'
import { CampaignSearchField } from './components/CampaignSearchField'
import { NewCampaignReviewModal } from './containers/modals/NewCampaignReviewModal'
import { asyncGetActiveCampaigns } from './store/campaigns'
import { DeleteCampaignModal } from './containers/modals/DeleteCampaignModal'

export const ActiveCampaigns = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState } = useModals()

  const {
    handleCreateCampaign,
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
            <CampaignSearchField />
            <CampaignNameFilter type={CAMPAIGN_TABLE_TYPES.ACTIVE} />
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
