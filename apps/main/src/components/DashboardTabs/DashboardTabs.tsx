import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Tabs } from '@/components/Tabs'
import { CallOperatorIcon } from 'components/icons/CallOperatorIcon'
import { LoudSpeakerIcon } from '@/icons/LoudSpeakerIcon'
import { TTabsProps } from '@/components/Tabs/Tabs'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { PhoneIcon } from '../icons/PhoneIcon'

export const DashboardTabs = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  const tabs: TTabsProps['tabs'] = [
    {
      label: t('campaigns:active-campaigns'),
      value: 'active-campaign',
      route: ROUTES.DASHBOARD_ACTIVE_CAMPAIGNS,
      icon: (color) => <LoudSpeakerIcon color={color} />,
    },
    {
      label: t('agents:active-agents'),
      value: 'active-agents',
      route: ROUTES.DASHBOARD_ACTIVE_AGENTS,
      icon: (color) => <CallOperatorIcon color={color} />,
    },
    {
      label: t('campaign-statistics:reports_campaign_statistics_calls'),
      value: 'call-statistics',
      route: ROUTES.DASHBOARD_CALL_STATISTICS,
      icon: (color) => <PhoneIcon color={color} />,
    },
  ]

  const [activeTab, setActiveTab] = useState(() => {
    const currentRoute = tabs.find((tab) => router.pathname.includes(tab.route as string))
    return currentRoute ? currentRoute.value : tabs[0].value
  })

  const handleChangeTab = (tab: string) => {
    const tabInfo = tabs.find((t) => t.value === tab)
    if (tabInfo && tabInfo.route) {
      router.replace(tabInfo.route)
    }
  }

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const currentRoute = tabs.find((tab) => url.includes(tab.route as string))
      if (currentRoute) {
        setActiveTab(currentRoute.value)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, tabs])

  return (
    <Tabs
      tabs={tabs}
      tabSize="244px"
      activeTab={activeTab}
      setActiveTab={handleChangeTab}
    />
  )
}
