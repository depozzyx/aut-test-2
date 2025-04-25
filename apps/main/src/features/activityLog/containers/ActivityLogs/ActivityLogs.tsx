import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Pagination } from '@peiko/components/Pagination'
import { Loader } from '@peiko/components/loaders/Loader'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { Text } from '@peiko/components/Text'
import { TPagination } from '@/types/entities/pagination'
import useTranslation from 'next-translate/useTranslation'
import { GroupedLogs } from '../../types/activity-log'
import { useCreateLogMessage } from '../../hooks/useCreateLogMessage'

export const ActivityLogs: FC<{
  logs: GroupedLogs[]
  loading: boolean
  pagination: TPagination
  onChangePage: (page: number) => void
}> = ({ logs, loading, pagination: { total, limit, page }, onChangePage }) => {
  const { createLogMessage } = useCreateLogMessage()
  const { t } = useTranslation('activity-log')

  return (
    <>
      <Flex
        direction="column"
        gap="8px"
        margin="24px 0 0"
        styles={{ minHeight: '500px' }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {logs.length === 0 && (
              <Text variant="f5" color="main4">
                {t('noLogs')}
              </Text>
            )}
            {logs.map(({ createdDay, data }) => (
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
                      <Text
                        variant="f8"
                        color="main5"
                        styles={{ justifyContent: 'center' }}
                      >
                        {createLogMessage(log)}
                      </Text>
                      <Text variant="f10" color="main22">
                        {format(new Date(log.createdAt), 'HH:mm aa')}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Card>
            ))}
          </>
        )}
      </Flex>
      <Flex justify="center" margin="48px 0 0">
        <Pagination
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Flex>
    </>
  )
}
