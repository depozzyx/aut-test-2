import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { CampaignStatisticsList } from '@/features/reports/CampaignStatisticsList'
import { Tabs, TTabsProps } from '@/components/Tabs'
import { Box } from '@peiko/components/Box'

import { useState } from 'react'
import { useTitle } from 'react-use'
import { PhoneIcon } from '../../../src/components/icons/PhoneIcon'
import { LeadsIcon } from '../../../src/components/icons/LeadsIcon'

const CampaignStatisticsPage: NextPage = () => {
  const { t } = useTranslation('campaign-statistics')
  useTitle(t('page-titles:reports-campaign-statistics'))

  const [type, setType] = useState<'calls' | 'leads'>('calls')

  const tabs: TTabsProps['tabs'] = [
    {
      label: t('campaign-statistics:reports_campaign_statistics_calls'),
      value: 'calls',
      icon: (color) => <PhoneIcon color={color} />,
    },
    {
      label: t('campaign-statistics:reports_campaign_statistics_leads'),
      value: 'leads',
      icon: (color) => <LeadsIcon color={color} />,
    },
  ]

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout title={t('reports_campaign_statistics')}>
        <Box styles={{ marginTop: '12px' }}>
          <Tabs
            tabs={tabs}
            tabSize="244px"
            activeTab={type}
            setActiveTab={(tab: string) => {
              setType(tab as 'calls' | 'leads')
            }}
          />
        </Box>
        <CampaignStatisticsList type={type} />
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignStatisticsPage
