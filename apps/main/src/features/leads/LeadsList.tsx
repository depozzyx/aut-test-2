import React, { FC, useEffect, useState } from 'react'
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
  selectLeadsGroupPagination,
  selectLeadsOrderBy,
  selectLeadsPagination,
  selectLeadsSortBy,
} from './store/leads'
import { CreateLeadsGroup } from './containers/CreateLeadsGroup'

export const LeadsList: FC = () => {
  const { select, dispatch } = useRedux()
  const [secondMount, setSecondMount] = useState(false)

  const {
    pagination: { total, page, limit },
    leadsGroup,
    groupsPagination,
    sortBy,
    orderBy,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      groupsPagination: selectLeadsGroupPagination,
      leadsGroup: selectLeadsGroup,
      sortBy: selectLeadsSortBy,
      orderBy: selectLeadsOrderBy,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getLeadsGroups({ page: 1, limit: groupsPagination.limit, orderBy: 'DESC' }))
  }, [])

  useEffect(() => {
    if (secondMount)
      dispatch(getLeadList({ page: 1, limit, orderBy, leadListId: leadsGroup, sortBy }))
  }, [leadsGroup, secondMount, sortBy, orderBy])

  useUnmount(() => {
    dispatch(reset())
  })

  useEffect(() => {
    if (!leadsGroup) setSecondMount(true)
  }, [leadsGroup])

  const onChangePage = (page: number) =>
    dispatch(getLeadList({ page, limit, orderBy: 'DESC', leadListId: leadsGroup }))

  return (
    <>
      <Box styles={{ marginTop: '24px' }}>
        <LeadsListTable />
      </Box>
      <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Box>
      <CreateLeadsGroup />
    </>
  )
}
