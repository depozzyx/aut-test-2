import React, { FC, useEffect, useState } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { useUnmount } from 'react-use'
import { Pagination } from '@peiko/components/Pagination'
import { Box } from '@peiko/components/Box'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import dynamic from 'next/dynamic'
import { LeadsTable } from './containers/LeadsTable'
import {
  getLeadList,
  getLeadsGroups,
  reset,
  selectLeadsGroup,
  selectLeadsGroupPagination,
  selectLeadsOrderBy,
  selectLeadsPagination,
  selectLeadsOrder,
} from './store/leads'
import { ImportFiles } from './containers/ImportFiles'
import { CreateLeads } from './containers/CreateLeads'

const CreateLeadsGroup = dynamic(
  () => import('./containers/CreateLeadsGroup').then((mod) => mod.CreateLeadsGroup),
  {
    ssr: false,
  },
)

export const ImportLeads: FC = () => {
  const { select, dispatch } = useRedux()
  const [step, setStep] = useState<'import' | 'list'>('import')

  const {
    pagination: { total, page, limit },
    groupsPagination,
    leadsGroup,
    orderBy,
    order,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      groupsPagination: selectLeadsGroupPagination,
      leadsGroup: selectLeadsGroup,
      orderBy: selectLeadsOrderBy,
      order: selectLeadsOrder,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getLeadsGroups({ page: 1, limit: groupsPagination.limit, order }))
  }, [])

  useUnmount(() => dispatch(reset()))

  const onImportSubmit = () => {
    setStep('list')
    dispatch(getLeadList({ page, limit, orderBy, order, leadListId: leadsGroup }))
  }

  const onChangePage = (page: number) =>
    dispatch(getLeadList({ page, limit, orderBy, order, leadListId: leadsGroup }))

  useEffect(() => {
    if (leadsGroup && step === 'list')
      dispatch(getLeadList({ page, limit, orderBy, leadListId: leadsGroup, order }))
  }, [leadsGroup, orderBy])

  return (
    <>
      {step === 'import' && <ImportFiles onSubmit={onImportSubmit} />}
      {step === 'list' && (
        <>
          <Box styles={{ marginLeft: 'auto', marginTop: '16px' }}>
            <CreateLeads />
          </Box>
          <Box styles={{ marginTop: '8px' }}>
            <LeadsTable reFetch={() => onChangePage(page)} />
          </Box>
          <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <Pagination
              lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
              currentPage={page}
              onChange={onChangePage}
            />
          </Box>
        </>
      )}
      <CreateLeadsGroup />
    </>
  )
}
