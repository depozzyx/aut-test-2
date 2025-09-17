import React, { FC, useEffect } from 'react'

import { Box } from '@peiko/components/Box'
import { useRedux } from '@/hooks/use-redux'

import { createStructuredSelector } from 'reselect'

import { shallowEqual } from 'react-redux'
import { Pagination } from '@peiko/components/Pagination/Pagination'
import { SingleValue } from 'react-select'
import { ExcelIcon } from '@peiko/components/icons/ExcelIcon/ExcelIcon'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import useTranslation from 'next-translate/useTranslation'
import { CDRListTable } from './containers/CDRListTable'
import {
  getCallsFile,
  getCallsList,
  selectCallsFilters,
  selectCallsOrder,
  selectCallsOrderBy,
  selectCallsPagination,
  selectIsLoading,
  setPagination,
} from './store/calls'
import { CallsFilters } from './containers/filter'
import { LimitSelect } from '../../components/limit-select'
import { TSelectOption } from '../../components/MutliSelect/types'
import { Flex } from '../../components/Flex'
import { formatCreatedAt } from '../campaigns/utils/formatCreateAt'
import { notificationActions } from '../common/notifications/store'

export const CallsList: FC = () => {
  const { dispatch, select } = useRedux()
  const { t } = useTranslation('calls-list')
  const {
    pagination: { total, page, limit },
    orderBy,
    order,
    isLoading,
    filters,
  } = select(
    createStructuredSelector({
      pagination: selectCallsPagination,
      orderBy: selectCallsOrderBy,
      order: selectCallsOrder,
      isLoading: selectIsLoading,
      filters: selectCallsFilters,
    }),
    shallowEqual,
  )

  const onChangePage = (page: number) =>
    dispatch(getCallsList({ page, orderBy, order, limit, ...filters }))

  const onChangeFilters = (page: number) => onChangePage(page)

  useEffect(() => {
    onChangeFilters(1)
  }, [limit, orderBy, order, filters])

  const onChangeLimit = (option: SingleValue<TSelectOption>) =>
    option &&
    dispatch(
      setPagination({
        page,
        limit: +option.value,
        total,
      }),
    )

  const handleDownload = () => {
    getCallsFile({ orderBy, order, ...filters })
      .then((url) => {
        if (url) {
          const a = document.createElement('a')
          a.href = url
          const fileName = formatCreatedAt(
            new Date().toISOString(),
            true,
            'HH-mm-ss',
          ).replace(/ /g, '_')
          a.download = `cdr_${fileName}.xlsx`
          document.body.appendChild(a)
          a.click()
          a.remove()
        }
      })
      .catch(() => {
        dispatch(
          notificationActions.setNotification({
            key: `notifications:agent.campaign`,
            status: 'info',
            values: {},
          }),
        )
      })
  }

  return (
    <>
      <Box
        styles={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}
      >
        <div style={{ width: '100%', flexGrow: 1 }}>
          <CallsFilters disabled={isLoading} filters={filters} />
        </div>
        <Flex gap={10}>
          <OutlinedButton
            onClick={() => handleDownload()}
            size="s"
            startIcon={<ExcelIcon width="24px" height="24px" />}
          >
            {t('Download')}
          </OutlinedButton>
          <LimitSelect disabled={isLoading} limit={limit} onChange={onChangeLimit} />
        </Flex>
      </Box>
      <Box styles={{ marginTop: '6px' }}>
        <CDRListTable />
      </Box>
      <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Box>
    </>
  )
}
