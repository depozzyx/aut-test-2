import useTranslation from 'next-translate/useTranslation'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { ActiveCampaignsTable } from '@/features/campaigns/containers/ActiveCampaignsTable'
import { CampaignsSelect } from '@/features/campaigns/containers/CampaignSelect'
import { DashboardTabs } from '@/components/DashboardTabs'
import { Pagination } from '@peiko/components/Pagination'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { RangeDayPicker } from '@/components/RangeDayPicker'
import { useCampaignsManager } from '@/features/campaigns/hooks/use-campaignsManager'
import { CreateCampaignModal } from './containers/CreateCampaignModal'
import { CampaignSearchField } from './components/CampaignSearchField'
import { NewCampaignReviewModal } from './containers/NewCampaignReviewModal'
import { asyncGetActiveCampaigns } from './store/campaigns'
import { DeleteCampaignModal } from './containers/DeleteCampaignModal'

export const ActiveCampaigns = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState } = useModals()

  const {
    handleCreateCampaign,
    handleChangePage,
    handleChangeDate,
    pagination: { page, total, limit },
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
          <Flex gap={16} align="center" width="100%">
            <CampaignSearchField />
            <CampaignsSelect type={CAMPAIGN_TABLE_TYPES.ACTIVE} />
            <RangeDayPicker onChange={handleChangeDate} />
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
      <DeleteCampaignModal type={CAMPAIGN_TABLE_TYPES.ACTIVE} />
      {createModalIsOpen && <CreateCampaignModal />}
      {reviewModalIsOpen && <NewCampaignReviewModal type={CAMPAIGN_TABLE_TYPES.ACTIVE} />}
    </>
  )
}
