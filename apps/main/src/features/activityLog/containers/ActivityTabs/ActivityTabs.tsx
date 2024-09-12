import { Tabs, TTabsProps } from '@/components/Tabs'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { ActivityIcon } from '@/icons/ActivityIcon'
import { BusinessIcon } from '@/icons/BusinessIcon'
import { LoudSpeakerIcon } from '@/icons/LoudSpeakerIcon'
import { ROUTES } from '@/routes'

export const ActivityTabs = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation('activity-log')

  const tabs: TTabsProps['tabs'] = [
    {
      label: t('tabs.general'),
      value: 'general',
      route: ROUTES.SETTINGS_ACTIVITY_LOG_GENERAL,
      icon: (color) => <ActivityIcon color={color} />,
    },
    {
      label: t('tabs.campaign'),
      value: 'campaign',
      route: ROUTES.SETTINGS_ACTIVITY_LOG_CAMPAIGN,
      icon: (color) => <LoudSpeakerIcon color={color} />,
    },
    {
      label: t('tabs.business'),
      value: 'business',
      icon: (color) => <BusinessIcon color={color} />,
      disabled: true,
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
      activeTab={activeTab}
      setActiveTab={handleChangeTab}
      tabs={tabs}
      tabSize="168px"
    />
  )
}
