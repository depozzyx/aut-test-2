import { Tabs } from '@/components/Tabs'
import { TTabsProps } from '@/components/Tabs/Tabs'
import { ActivityIcon } from '@/icons/ActivityIcon'
import { BusinessIcon } from '@/icons/BusinessIcon'
import { Box } from '@peiko/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import { Card } from '@peiko/components/Card'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { format } from 'date-fns'
import { Pagination } from '@peiko/components/Pagination'
import { Loader } from '@peiko/components/loaders/Loader'
import { useActivityLogs } from './hooks/useActivityLogs'
import { useCreateLogMessage } from './hooks/useCreateLogMessage'

export const ActivityLog: FC = () => {
  const { t } = useTranslation('activity-log')
  const {
    getActivityLogsAsync,
    logs,
    pagination: { total, limit, page },
    loading,
  } = useActivityLogs()
  const { createLogMessage } = useCreateLogMessage()

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

  const onChangePage = (page: number) =>
    getActivityLogsAsync({ page, limit, orderBy: 'DESC' })

  return (
    <Box styles={{ marginTop: '10px' }}>
      <Tabs
        tabSize="168px"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <Flex
        direction="column"
        gap="8px"
        margin="24px 0 0"
        styles={{ minHeight: '500px' }}
      >
        {loading ? (
          <Loader />
        ) : (
          logs.map(({ createdDay, data }) => (
            <Card
              key={createdDay}
              padding="8px 23px 8px 86px"
              styles={{
                position: 'relative',
                minHeight: '97px',
                display: 'flex',
                alignItems: 'center',
              }}
              fullWidth
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                width="70px"
                height="81px"
                styles={{
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <Text variant="f10" color="main5">
                  {format(new Date(createdDay), 'EEE').toUpperCase()}
                </Text>
                <Text variant="f6" styles={{ lineHeight: '28px' }} color="main5">
                  {format(new Date(createdDay), 'dd')}
                </Text>
                <Text variant="f10" color="main5">
                  {format(new Date(createdDay), 'MMM')}
                </Text>
              </Flex>
              <Flex direction="column" gap="18px" styles={{ flex: '1' }}>
                {data.map((log) => (
                  <Flex key={log.id} fullWidth justify="space-between" align="center">
                    <Text variant="f8" color="main5">
                      {createLogMessage(log)}
                    </Text>
                    <Text variant="f10" color="main22">
                      {format(new Date(log.createdAt), 'HH:mm aa')}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Card>
          ))
        )}
      </Flex>
      <Flex justify="center" margin="48px 0 0">
        <Pagination
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Flex>
    </Box>
  )
}
