import { Tabs, TTabsProps } from '@/components/Tabs'
import React from 'react'

type CampaignEditTabsProps = {
  tabs: TTabsProps['tabs']
  activeTab: TCampaignEditTab
  setActiveTab: (tab: TCampaignEditTab) => void
}

export type TCampaignEditTab = 'general' | 'leads' | 'recycle' | 'routes'

export const CampaignEditTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: CampaignEditTabsProps): JSX.Element => {
  const handleChangeTab = (tab: TCampaignEditTab) => {
    setActiveTab(tab)
  }

  return (
    <Tabs
      activeTab={activeTab}
      setActiveTab={handleChangeTab as (tab: string) => void}
      tabs={tabs}
    />
  )
}
