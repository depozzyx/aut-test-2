import React, { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useUnmount } from 'react-use'

import { Pagination } from '@peiko/components/Pagination'
import { Box } from '@peiko/components/Box'
import { LeadFilters } from '@/features/leads/containers/Filters/LeadFilters'
import { useFormik } from 'formik'
import { TFormik } from '@peiko/types/formik'
import { cleanObject } from '@/utils/object'
import { LeadsTable } from './containers/LeadsTable'

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

export const Leads: FC = () => {
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
    dispatch(getLeadsGroups({ page: 1, limit: groupsPagination.limit, orderBy }))
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

  const filters: TFormik = useFormik({
    initialValues: {
      id: '',
      name: '',
      phone: '',
      status: '',
      campaignId: '',
      leadListId: '',
      limit,
    },
    onSubmit: () => undefined,
  })

  const onChangePage = (page: number) =>
    dispatch(
      getLeadList({
        page,
        limit,
        orderBy,
        leadListId: leadsGroup,
        ...cleanObject(filters.values),
      }),
    )

  const onChangeFilters = () => onChangePage(page)

  useEffect(() => {
    onChangeFilters()
  }, [filters.values])

  return (
    <>
      <Box styles={{ marginTop: '24px' }}>
        <LeadFilters filters={filters} onResetFilters={filters.resetForm} />
      </Box>
      <Box styles={{ marginTop: '6px' }}>
        <LeadsTable reFetch={() => onChangePage(page)} />
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
