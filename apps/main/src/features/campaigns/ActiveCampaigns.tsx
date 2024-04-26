import { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { ActiveCampaignsTable } from '@/features/campaigns/containers/ActiveCampaignsTable'
import { CampaignsSelect } from '@/features/campaigns/containers/CampaignSelect'
import { DashboardTabs } from '@/components/DashboardTabs'
import { useUnmount } from 'react-use'
import { Pagination } from '@peiko/components/Pagination'
import { CreateCampaignModal } from './containers/CreateCampaignModal'
import { CampaignSearchField } from './components/CampaignSearchField'
import {
  reset,
  selectCampaignsPagination,
  asyncGetActiveCampaigns,
} from './store/campaigns'

export const ActiveCampaigns = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { setModal } = useModals()
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page, limit },
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
    }),
    shallowEqual,
  )

  const createCampaignHandler = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }

  useEffect(() => {
    dispatch(asyncGetActiveCampaigns({ page, limit, orderBy: 'ASC' }))
  }, [page])

  useUnmount(() => {
    dispatch(reset())
  })

  return (
    <>
      <Flex direction="column" padding="12px 0 0 0">
        <DashboardTabs />
        <Flex padding="12px 0 0 0" justify="space-between">
          <Flex gap={16} align="center">
            <CampaignSearchField />
            <Flex>
              <CampaignsSelect />
            </Flex>
          </Flex>
          <FilledButton
            size="m"
            maxWidth="236px"
            width="100%"
            startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
            onClick={createCampaignHandler}
          >
            {t('add-campaign')}
          </FilledButton>
        </Flex>
        <ActiveCampaignsTable />
        <Flex padding="40px 0 0 0" justify="center">
          <Pagination lastPage={Math.ceil(total / (limit ?? 15))} currentPage={page} />
        </Flex>
      </Flex>
      <CreateCampaignModal />
    </>
  )
}
