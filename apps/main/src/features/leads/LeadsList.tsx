import React, { FC, useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Pagination } from '@peiko/components/Pagination'
import { Box } from '@peiko/components/Box'
import { LeadsListTable } from './containers/LeadsListTable'
import {
  getLeadList,
  getLeadsGroups,
  selectLeadsGroup,
  selectLeadsPagination,
} from './store/campaigns-list'

export const LeadsList: FC = () => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page },
    leadsGroup,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      leadsGroup: selectLeadsGroup,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getLeadsGroups())
  }, [])

  useEffect(() => {
    dispatch(getLeadList(leadsGroup))
  }, [leadsGroup])

  return (
    <>
      <Box styles={{ marginTop: '24px' }}>
        <LeadsListTable />
      </Box>
      <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Pagination lastPage={total} currentPage={page} />
      </Box>
    </>
  )
}
