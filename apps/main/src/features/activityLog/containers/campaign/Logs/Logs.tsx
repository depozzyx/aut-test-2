import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { Box } from '@peiko/components/Box'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Flex } from '@/components/Flex'
import { Loader } from '@peiko/components/loaders/Loader/Loader'
import {
  asyncGetCampaignLog,
  selectIsCLLoading,
  selectLogPagination,
  selectParams,
} from '../../../store/campaign-log'
import { LogContentWrapper, PaginationContainer } from './Logs.styled'
import { LogsPanel } from './LogsPanel'
import { LogsRecords } from './LogsRecords'

export const Logs = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { dispatch, select } = useRedux()

  const isCLLoading = select(selectIsCLLoading)
  const params = select(selectParams, shallowEqual)
  const { page, limit, total } = select(selectLogPagination)

  const onChangePage = (page: number) =>
    dispatch(
      asyncGetCampaignLog({
        ...params,
        page,
        limit,
      }),
    )

  return (
    <Box styles={{ width: '100%' }}>
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
          <LogsRecords />
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
