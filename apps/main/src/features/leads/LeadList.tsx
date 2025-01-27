import React, { FC, useEffect } from 'react'

import { Box } from '@peiko/components/Box'
import { LeadListTable } from '@/features/leads/containers/LeadListTable'
import { useRedux } from '@/hooks/use-redux'
import { asyncGetLeadLists } from '@/features/leads/store/lead-list'
import { createStructuredSelector } from 'reselect'
import {
  selectLeadsOrderBy,
  selectLeadsPagination,
  selectLeadsSortBy,
} from '@/features/leads/store/leads'
import { shallowEqual } from 'react-redux'
import { Pagination } from '@peiko/components/Pagination/Pagination'
import { useFormik } from 'formik'
import { cleanObject } from '@/utils/object'
import { TFormik } from '@peiko/types/formik'
import { LeadListFilters } from '@/features/leads/containers/Filters/LeadListFilters'

export const LeadList: FC = () => {
  const { dispatch, select } = useRedux()

  const {
    pagination: { total, page, limit },
    orderBy,
    sortBy,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      sortBy: selectLeadsSortBy,
      orderBy: selectLeadsOrderBy,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(asyncGetLeadLists({ page, limit, orderBy, sortBy }))
  }, [orderBy, sortBy])

  const filters: TFormik = useFormik({
    initialValues: {
      id: '',
      name: '',
      campaignStatus: '',
      campaignId: '',
      limit,
    },
    onSubmit: () => undefined,
  })

  const onChangePage = (page: number) =>
    dispatch(asyncGetLeadLists({ page, orderBy, sortBy, ...cleanObject(filters.values) }))

  const onChangeFilters = () => onChangePage(1)

  useEffect(() => {
    onChangeFilters()
  }, [filters.values])

  return (
    <>
      <Box styles={{ marginTop: '24px' }}>
        <LeadListFilters filters={filters} onResetFilters={filters.resetForm} />
      </Box>
      <Box styles={{ marginTop: '6px' }}>
        <LeadListTable reFetch={() => onChangePage(page)} />
      </Box>
      <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Box>
    </>
  )
}
