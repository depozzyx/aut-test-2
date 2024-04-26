import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { LoudSpeakerIcon } from '@peiko/components/icons/LoudSpeakerIcon'
import { CallOperatorIcon } from '@peiko/components/icons/CallOperatorIcon'
import { ROUTES } from '@/constants/routes'
import { DashboardTabStyled } from './DashboardTabs.styled'

export const DashboardTabs = (): JSX.Element => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const tabs = [
    { label: t('campaigns:active-campaigns'), value: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS },
    { label: t('agents:active-agents'), value: ROUTES.DASHBOARD_ACTIVE_AGENTS },
  ]

  const handleSetActiveTab = (tab: string) => {
    router.push(tab)
  }

  return (
    <Flex>
      <DashboardTabStyled
        isActive={router.pathname === ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS}
        onClick={() => handleSetActiveTab(tabs[0].value)}
      >
        {tabs[0].label}
        <LoudSpeakerIcon width="24px" height="24px" />
      </DashboardTabStyled>
      <DashboardTabStyled
        isActive={router.pathname === ROUTES.DASHBOARD_ACTIVE_AGENTS}
        onClick={() => handleSetActiveTab(tabs[1].value)}
      >
        {tabs[1].label}
        <CallOperatorIcon width="24px" height="24px" />
      </DashboardTabStyled>
    </Flex>
  )
}
