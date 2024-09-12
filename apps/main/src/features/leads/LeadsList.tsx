import React, { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useUnmount } from 'react-use'

import { Pagination } from '@peiko/components/Pagination'
import { Box } from '@peiko/components/Box'
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

const CreateLeadsGroup = dynamic(
  () => import('./containers/CreateLeadsGroup').then((mod) => mod.CreateLeadsGroup),
  {
    ssr: false,
  },
)

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
