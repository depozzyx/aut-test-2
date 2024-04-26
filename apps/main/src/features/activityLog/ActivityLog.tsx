import { Tabs } from '@/components/Tabs'
import { TTabsProps } from '@/components/Tabs/Tabs'
import { ActivityIcon } from '@/icons/ActivityIcon'
import { BusinessIcon } from '@/icons/BusinessIcon'
import { Box } from '@peiko/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'

export const ActivityLog: FC = () => {
  const { t } = useTranslation('activity-log')

  const tabs: TTabsProps['tabs'] = [
    {
      label: t('tabs.general'),
      value: 'general',
      icon: (color) => <ActivityIcon color={color} />,
    },
    {
      label: t('tabs.business'),
      value: 'business',
      icon: (color) => <BusinessIcon color={color} />,
      disabled: true,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].value)

  return (
    <Box styles={{ marginTop: '10px' }}>
      <Tabs
        tabSize="168px"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
    </Box>
  )
}
