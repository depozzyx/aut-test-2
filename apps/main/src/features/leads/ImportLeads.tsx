import React, { FC, useEffect, useState } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { useUnmount } from 'react-use'
import { Pagination } from '@peiko/components/Pagination'
import { Box } from '@peiko/components/Box'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { LeadsListTable } from './containers/LeadsListTable'
import {
  getLeadList,
  getLeadsGroups,
  reset,
  selectLeadsGroup,
  selectLeadsGroupPagination,
  selectLeadsPagination,
} from './store/leads'
import { ImportFiles } from './containers/ImportFiles'
import { CreateLeads } from './containers/CreateLeads'
import { CreateLeadsGroup } from './containers/CreateLeadsGroup'

export const ImportLeads: FC = () => {
  const { select, dispatch } = useRedux()
  const [step, setStep] = useState<'import' | 'list'>('import')

  const {
    pagination: { total, page, limit },
    groupsPagination,
    leadsGroup,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      groupsPagination: selectLeadsGroupPagination,
      leadsGroup: selectLeadsGroup,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(
      getLeadsGroups({ page: 1, limit: groupsPagination.limit, orderBy: 'ASC' }, true),
    )
  }, [])

  useUnmount(() => dispatch(reset()))

  const onImportSubmit = () => {
    setStep('list')
    dispatch(getLeadList({ page, limit, orderBy: 'ASC', leadListId: leadsGroup }))
  }

  const onChangePage = (page: number) =>
    dispatch(getLeadList({ page, limit, orderBy: 'ASC', leadListId: leadsGroup }))

  useEffect(() => {
    if (leadsGroup && step === 'list')
      dispatch(getLeadList({ page, limit, orderBy: 'ASC', leadListId: leadsGroup }))
  }, [leadsGroup])

  return (
    <>
      {step === 'import' && <ImportFiles onSubmit={onImportSubmit} />}
      {step === 'list' && (
        <>
          <Box styles={{ marginLeft: 'auto', marginTop: '16px' }}>
            <CreateLeads />
          </Box>
          <Box styles={{ marginTop: '8px' }}>
            <LeadsListTable />
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
