import { shallowEqual } from 'react-redux'
import { Box } from '@peiko/components/Box'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { Loader } from '@peiko/components/loaders/Loader'
import { createStructuredSelector } from 'reselect'
import { selectLogPagination, setPagination } from '../../../store/campaign-log'
import { LogContentWrapper, PaginationContainer } from './Logs.styled'
import { LogsPanel } from './LogsPanel'
import { LogsRecords } from './LogsRecords'
import { useFetchCampaignLogs } from '../../../hooks/campaign/use-fetch-logs'
import { SelectedParams } from './SelectedParams'

export const Logs = (): JSX.Element => {
  const { dispatch, select } = useRedux()
  const { isLoading } = useFetchCampaignLogs()

  const {
    pagination: { page, limit, total },
  } = select(
    createStructuredSelector({
      pagination: selectLogPagination,
    }),
    shallowEqual,
  )

  const onChangePage = (newPage: number) =>
    dispatch(setPagination({ page: newPage, limit, total }))

  return (
    <Box styles={{ width: '100%', height: '100%' }}>
      <Flex justify="space-between" align="center">
        <LogsPanel />
      </Flex>
      <SelectedParams />
      <LogContentWrapper isLoading={isLoading}>
        {isLoading ? (
          <Loader width="32px" height="32px" styles={{ height: '100%' }} />
        ) : (
          <LogsRecords isLoading={isLoading} />
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
