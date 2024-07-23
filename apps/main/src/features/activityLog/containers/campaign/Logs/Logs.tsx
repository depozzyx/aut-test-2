import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { Box } from '@peiko/components/Box'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Flex } from '@/components/Flex'
import { Loader } from '@peiko/components/loaders/Loader/Loader'
import { createStructuredSelector } from 'reselect'
import {
  selectIsCLLoading,
  selectLogPagination,
  setPagination,
} from '../../../store/campaign-log'
import { LogContentWrapper, PaginationContainer } from './Logs.styled'
import { LogsPanel } from './LogsPanel'
import { LogsRecords } from './LogsRecords'
import { useFetchCampaignLogs } from '../../../hooks/campaign/use-fetch-logs'

export const Logs = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { dispatch, select } = useRedux()
  useFetchCampaignLogs()

  const {
    isCLLoading,
    pagination: { page, limit, total },
  } = select(
    createStructuredSelector({
      isCLLoading: selectIsCLLoading,
      pagination: selectLogPagination,
    }),
    shallowEqual,
  )

  const onChangePage = (newPage: number) =>
    dispatch(setPagination({ page: newPage, limit, total }))

  return (
    <Box styles={{ width: '100%', height: '100%' }}>
      <Flex justify="space-between" align="center">
        <FilledButton
          // onClick={() => console.log('test')}
          width="184px"
          styles={{ height: '32px' }}
        >
          {t('export')}
        </FilledButton>
        <LogsPanel />
      </Flex>
      <LogContentWrapper isLoading={isCLLoading}>
        {isCLLoading ? (
          <Loader width="32px" height="32px" styles={{ height: '100%' }} />
        ) : (
          <LogsRecords isLoading={isCLLoading} />
        )}
      </LogContentWrapper>
      <PaginationContainer>
        <Pagination
          size="s"
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
          currentPage={page}
          onChange={onChangePage}
        />
      </PaginationContainer>
    </Box>
  )
}
