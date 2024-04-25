import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { ROUTES } from '@/constants/routes'
import { SearchField } from '@/features/campaigns/components/SearchField'
import { ActiveCampaignsTable } from '@/features/campaigns/containers/ActiveCampaignsTable'
import { DashboardTabs } from './components/DashboardTabs'

export const Dashboard = (): JSX.Element => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('active-campaign')
  const { setModal } = useModals()

  const buttonText =
    activeTab === 'active-campaign' ? t('campaigns:add-campaign') : 'Create agent'

  const buttonHandler = () => {
    if (activeTab === 'active-campaign') {
      setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
    } else {
      router.push(ROUTES.CABINET_CREATE_AGENT)
    }
  }

  return (
    <Flex direction="column" padding="12px 0 0 0">
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Flex padding="16px 0 0 0" justify="space-between">
        <Flex gap="">
          <SearchField />
          <Flex />
        </Flex>
        <FilledButton
          size="m"
          maxWidth="236px"
          width="100%"
          startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
          onClick={buttonHandler}
        >
          {buttonText}
        </FilledButton>
      </Flex>
      <ActiveCampaignsTable />
    </Flex>
  )
}
