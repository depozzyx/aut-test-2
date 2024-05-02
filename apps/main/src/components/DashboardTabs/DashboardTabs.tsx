import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Tabs } from '@/components/Tabs'
import { CallOperatorIcon } from '@peiko/components/icons/CallOperatorIcon'
import { LoudSpeakerIcon } from '@peiko/components/icons/LoudSpeakerIcon'
import { TTabsProps } from '@/components/Tabs/Tabs'

export const DashboardTabs = (): JSX.Element => {
  const { t } = useTranslation('common')

  const tabs: TTabsProps['tabs'] = [
    {
      label: t('campaigns:active-campaigns'),
      value: 'active-campaign',
      icon: (color) => <LoudSpeakerIcon color={color} />,
    },
    {
      label: t('agents:active-agents'),
      value: 'active-agents',
      icon: (color) => <CallOperatorIcon color={color} />,
      disabled: true,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].value)

  return <Tabs tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
}
