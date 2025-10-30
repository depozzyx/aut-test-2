import React, { FC, useEffect, useState } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { useUnmount } from 'react-use'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
  getLeadsGroups,
  reset,
  selectLeadsGroup,
  selectLeadsGroupPagination,
  selectLeadsOrder,
  importFilesSubmitAsync,
  selectFilesForImport,
  importFilesCheckAsync,
  selectLeadIsChecking,
  setLeadsGroup,
} from './store/leads'
import { ImportFiles } from './containers/ImportFiles'
import { ROUTES } from '../../constants/routes'

const CreateLeadsGroup = dynamic(
  () => import('./containers/CreateLeadsGroup').then((mod) => mod.CreateLeadsGroup),
  {
    ssr: false,
  },
)

export const ImportLeads: FC = () => {
  const { select, dispatch } = useRedux()
  const [currentLeadId, setCurrentLeadId] = useState<number>()

  const router = useRouter()
  const { groupsPagination, leadsGroup, order, files, leadIsChecking } = select(
    createStructuredSelector({
      groupsPagination: selectLeadsGroupPagination,
      leadsGroup: selectLeadsGroup,
      order: selectLeadsOrder,
      files: selectFilesForImport,
      leadIsChecking: selectLeadIsChecking,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getLeadsGroups({ page: 1, limit: groupsPagination.limit, order }))
  }, [])

  useUnmount(() => {
    dispatch(reset())
    if (currentLeadId) {
      dispatch(setLeadsGroup(currentLeadId))
    }
  })

  const onImportSubmit = (shuffle: boolean) => {
    dispatch(importFilesSubmitAsync(shuffle))
  }

  useEffect(() => {
    if (files.length && files.every((file) => file?.importProgress === 100)) {
      router.push(ROUTES.LEADS)
      setCurrentLeadId(leadsGroup)
    }
  }, [files])

  useEffect(() => {
    if (
      !leadIsChecking &&
      files.length &&
      files.every((file) => file?.uploadProgress === 100)
    ) {
      dispatch(importFilesCheckAsync())
    }
  }, [leadsGroup, files.length, files.map((f) => f.uploadProgress).join(',')])

  return (
    <>
      <ImportFiles onSubmit={onImportSubmit} />
      <CreateLeadsGroup />
    </>
  )
}
