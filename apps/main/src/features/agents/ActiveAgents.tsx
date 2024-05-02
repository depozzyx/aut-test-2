import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { DashboardTabs } from '@/components/DashboardTabs'
import { ROUTES } from '@/constants/routes'
import { StatusFilter } from '@/components/StatusFilter'
import { AgentSearchField } from './components/AgentSearchField'
import { ActiveAgentsTable } from './containers/ActiveAgentsTable'

export const ActiveAgents = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const router = useRouter()

  const createCampaignHandler = () => {
    router.push(ROUTES.CREATE_AGENT)
  }

  return (
    <Flex direction="column" padding="12px 0 0 0">
      <DashboardTabs />
      <Flex padding="12px 0 0 0" justify="space-between">
        <Flex gap={16} align="center">
          <AgentSearchField />
          <Flex>
            <StatusFilter />
          </Flex>
        </Flex>
        <FilledButton
          size="m"
          maxWidth="236px"
          width="100%"
          startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
          onClick={createCampaignHandler}
        >
          {t('add-agent')}
        </FilledButton>
      </Flex>
      <ActiveAgentsTable />
    </Flex>
  )
}
