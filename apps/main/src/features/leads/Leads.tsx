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
import { getMaxPage } from '@/utils/pagination'
import { LeadsTable } from './containers/LeadsTable'

import {
  getLeadList,
  getLeadsGroups,
  reset,
  selectLeadsGroup,
  selectLeadsGroupPagination,
  selectLeadsOrderBy,
  selectLeadsOrder,
  selectLeadsPagination,
  selectIsLoading,
} from './store/leads'

const CreateLeadsGroup = dynamic(
  () => import('./containers/CreateLeadsGroup').then((mod) => mod.CreateLeadsGroup),
  {
    ssr: false,
  },
)

export const Leads: FC = () => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { total, page, limit },
    leadsGroup,
    groupsPagination,
    orderBy,
    order,
    isLoading,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      groupsPagination: selectLeadsGroupPagination,
      leadsGroup: selectLeadsGroup,
      orderBy: selectLeadsOrderBy,
      order: selectLeadsOrder,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  const [canLoadList, setCanLoadList] = React.useState<boolean>(false)

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

  useUnmount(() => {
    dispatch(reset())
  })

  const [controller, setController] = useState<AbortController>(new AbortController())

  const onChangePage = (page: number) => {
    if (!canLoadList) {
      return
    }
    let newController: AbortController = new AbortController()
    if (isLoading) {
      controller.abort()
    }

    dispatch(
      getLeadList(
        {
          page,
          orderBy,
          order,
          ...cleanObject(filters.values),
        },
        newController,
      ),
    )
    setController(newController)
  }
  const onChangeFilters = () =>
    onChangePage(
      filters.values.limit !== limit
        ? getMaxPage({ total, page, limit: filters.values.limit }, page)
        : 1,
    )

  useEffect(() => {
    onChangeFilters()
  }, [filters.values, orderBy, order, canLoadList])

  useEffect(() => {
    dispatch(getLeadsGroups({ page: 1, limit: groupsPagination.limit }))
    if (leadsGroup) {
      filters.setFieldValue('leadListId', leadsGroup.toString())
    }
    setCanLoadList(true)
  }, [])

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
          lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
          currentPage={page}
          onChange={onChangePage}
        />
      </Box>
      <CreateLeadsGroup />
    </>
  )
}
