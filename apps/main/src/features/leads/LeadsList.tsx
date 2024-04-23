import React, { FC, useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Pagination } from '@peiko/components/Pagination'
import { Box } from '@peiko/components/Box'
import { useUnmount } from 'react-use'
import { LeadsListTable } from './containers/LeadsListTable'
import {
  getLeadList,
  getLeadsGroups,
  reset,
  selectLeadsGroup,
  selectLeadsPagination,
} from './store/leads'

export const LeadsList: FC = () => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page, limit },
    leadsGroup,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      leadsGroup: selectLeadsGroup,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getLeadsGroups(true))
  }, [])

  useEffect(() => {
    dispatch(getLeadList({ page, limit, orderBy: 'ASC' }))
  }, [leadsGroup])

  useUnmount(() => {
    dispatch(reset())
  })

  const onChangePage = (page: number) =>
    dispatch(getLeadList({ page, limit, orderBy: 'ASC' }))

  return (
    <>
      <Box styles={{ marginTop: '24px' }}>
        <LeadsListTable />
      </Box>
      <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          lastPage={Math.ceil(total / (limit ?? 15))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Box>
    </>
  )
}
