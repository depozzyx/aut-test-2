import { Flex } from '@/components/Flex'
import { FC, ReactNode, useState } from 'react'
import { TPalette } from '@peiko/styles/types/palette'
import * as S from './Tabs.styled'

type TTab = {
  value: string
  label: ReactNode
  icon: (color: keyof TPalette) => JSX.Element
  disabled?: boolean
}

export type TTabsProps<T = TTab[]> = {
  activeTab: string
  setActiveTab: (tab: string) => void
  tabs: T
  tabSize?: string
}

const Tab: FC<TTabsProps<TTab>> = ({
  activeTab,
  setActiveTab,
  tabs: { value, label, icon, disabled },
  tabSize,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const iconColor = (): keyof TPalette => {
    if (isHovered || isFocused) return 'main20'
    if (disabled) return 'main22'
    return 'main2'
  }

  return (
    <S.Tab
      tabSize={tabSize}
      key={value}
      isActive={activeTab === value}
      onClick={() => setActiveTab(value)}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {label}
      {icon(iconColor())}
    </S.Tab>
  )
}

export const Tabs: FC<TTabsProps> = ({ activeTab, setActiveTab, tabs, tabSize }) => {
  const handleSetActiveTab = (tab: string) => () => {
    if (tab === activeTab) return
    setActiveTab(tab)
  }

  return (
    <Flex>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          tabs={tab}
          tabSize={tabSize}
        />
      ))}
    </Flex>
  )
}
