import { Flex } from '@/components/Flex'
import useTranslation from 'next-translate/useTranslation'
import { LoudSpeakerIcon } from '@peiko/components/icons/LoudSpeakerIcon'
import { CallOperatorIcon } from '@peiko/components/icons/CallOperatorIcon'
import { DashboardTabStyled } from './DashboardTabs.styled'

interface IDashboardTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const DashboardTabs = ({
  activeTab,
  setActiveTab,
}: IDashboardTabsProps): JSX.Element => {
  const { t } = useTranslation('common')

  const handleSetActiveTab = (tab: string) => () => {
    if (tab === activeTab) return
    setActiveTab(tab)
  }

  const tabs = [
    { label: t('campaigns:active-campaigns'), value: 'active-campaign' },
    { label: t('agents:active-agents'), value: 'active-agents' },
  ]

  return (
    <Flex>
      <DashboardTabStyled
        isActive={activeTab === 'active-campaign'}
        onClick={handleSetActiveTab(tabs[0].value)}
      >
        {tabs[0].label}
        <LoudSpeakerIcon width="24px" height="24px" />
      </DashboardTabStyled>
      <DashboardTabStyled
        isActive={activeTab === 'active-agents'}
        onClick={handleSetActiveTab(tabs[1].value)}
        disabled
      >
        {tabs[1].label}
        <CallOperatorIcon width="24px" height="24px" />
      </DashboardTabStyled>
    </Flex>
  )
}
