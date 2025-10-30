import React, { FC, useEffect, useState } from 'react'

import { Box } from '@peiko/components/Box'
import { LeadListTable } from '@/features/leads/containers/LeadListTable'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncGetLeadLists,
  selectLeadListPagination,
  selectLeadListsOrderBy,
  selectLeadListsOrder,
  selectIsRequested,
} from '@/features/leads/store/lead-list'
import { createStructuredSelector } from 'reselect'

import { shallowEqual } from 'react-redux'
import { Pagination } from '@peiko/components/Pagination/Pagination'
import { useFormik } from 'formik'
import { cleanObject } from '@/utils/object'
import { TFormik } from '@peiko/types/formik'
import { LeadListFilters } from '@/features/leads/containers/Filters/LeadListFilters'
import { getMaxPage } from '../../utils/pagination'

export const LeadList: FC = () => {
  const { dispatch, select } = useRedux()

  const {
    pagination: { total, page, limit },
    orderBy,
    order,
    isRequested,
  } = select(
    createStructuredSelector({
      pagination: selectLeadListPagination,
      orderBy: selectLeadListsOrderBy,
      order: selectLeadListsOrder,
      isRequested: selectIsRequested,
    }),
    shallowEqual,
  )

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

  const [controller, setController] = useState<AbortController>(new AbortController())

  const onChangePage = (page: number) => {
    let newController: AbortController = new AbortController()
    if (isRequested) {
      controller.abort()
    }
    dispatch(
      asyncGetLeadLists(
        { page, limit, orderBy, order, ...cleanObject(filters.values) },
        newController,
        true,
      ),
    )
    setController(newController)
  }

  useEffect(() => {
    onChangePage(page)
  }, [orderBy, order])

  const onChangeFilters = () =>
    onChangePage(
      filters.values.limit !== limit
        ? getMaxPage({ total, page, limit: filters.values.limit }, page)
        : 1,
    )

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
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Box>
    </>
  )
}
