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
  selectLeadsPagination,
} from './store/leads'
import { ImportFiles } from './containers/ImportFiles'
import { CreateLeads } from './containers/CreateLeads'

export const ImportLeads: FC = () => {
  const { select, dispatch } = useRedux()
  const [step, setStep] = useState<'import' | 'list'>('import')

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
    dispatch(getLeadsGroups(true))
  }, [])

  useUnmount(() => dispatch(reset()))

  return (
    <>
      {step === 'import' && (
        <ImportFiles
          onSubmit={() => {
            setStep('list')
            dispatch(getLeadList(leadsGroup))
          }}
        />
      )}
      {step === 'list' && (
        <>
          <Box styles={{ marginLeft: 'auto', marginTop: '16px' }}>
            <CreateLeads />
          </Box>
          <Box styles={{ marginTop: '8px' }}>
            <LeadsListTable />
          </Box>
          <Box styles={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <Pagination lastPage={total} currentPage={page} />
          </Box>
        </>
      )}
    </>
  )
}
