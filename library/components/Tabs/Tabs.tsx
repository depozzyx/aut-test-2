import React, { useEffect, useState } from 'react'
import { TTabsProps } from './types'
import { TabButton, TabList } from './Tabs.styles'

export const Tabs: React.FC<TTabsProps> = ({
  activeTab = 1,
  onChange,
  tabs,
  children,
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab)

  const handleTabClick = (index: number) => () => {
    setCurrentTab(index)
    if (onChange) {
      onChange(index)
    }
  }

  useEffect(() => {
    const isItemActiveAndDisabled = tabs[currentTab - 1]?.disabled

    if (isItemActiveAndDisabled) {
      const nextActiveTab = tabs.findIndex((tab) => !tab.disabled) + 1
      setCurrentTab(nextActiveTab)
      if (onChange) {
        onChange(nextActiveTab)
      }
    }
  }, [activeTab])

  return (
    <>
      <TabList>
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.label}
            isActive={currentTab === index + 1}
            onClick={handleTabClick(index + 1)}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      <div>
        {React.Children.map(children, (child, index) =>
          currentTab === index + 1 ? child : null,
        )}
      </div>
    </>
  )
}
