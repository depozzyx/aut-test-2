import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { Pagination } from '@peiko/components/Pagination'
import { QuestionModal } from '@/features/common/QuestionModal'
import {
  Panel,
  TableContainer,
  PaginationContainer,
} from '@/features/agents/styles/AgentsList.styled'
import { SingleValue } from 'react-select'
import { Input } from '@peiko/components/inputs/Input'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { SuccessIcon } from '@peiko/components/icons/SuccessIcon'
import {
  asyncCreateRoute,
  asyncFetchRoutes,
  asyncUpdateRoute,
  deleteRoute,
  selectRoutesList,
  selectRoutesLoading,
  selectRoutesPagination,
  setPagination,
} from './store/routes'
import { Flex } from '../../components/Flex'
import { LimitSelect } from '../../components/limit-select'
import { TSelectOption } from '../../components/MutliSelect/types'
import { SearchFieldIcon } from '../../components/icons/SearchFieldIcon'
import { Container } from '../users/styles/UserList.styled'
import { TRoute } from '../../api/rest/routes/types'
import { InfoCell } from '../../components/InfoCell'

export const RoutesList: React.FC = () => {
  const { t } = useTranslation('routes')
  const { select, dispatch } = useRedux()
  const { setModal, resetModals } = useModals()

  const {
    routes,
    isLoading,
    pagination: { total, page, limit },
  } = select(
    createStructuredSelector({
      routes: selectRoutesList,
      isLoading: selectRoutesLoading,
      pagination: selectRoutesPagination,
    }),
    shallowEqual,
  )
  const [searchTerm, setSearchTerm] = useState<string>('')

  const fetchRoutes = (newPage = page) => {
    dispatch(asyncFetchRoutes({ page: newPage, limit, name: searchTerm }))
  }

  useEffect(() => {
    fetchRoutes(1)
  }, [dispatch, searchTerm, limit])

  const onChangePage = (page: number) => {
    fetchRoutes(page)
  }

  const [currentRoute, setCurrentRoute] = useState<TRoute | null>(null)
  const [editedRow, setEditedRow] = useState<{
    id: number
    route: TRoute
    isSummited?: boolean
  } | null>(null)

  const handleUpdateRoute = useCallback(
    (route: TRoute) => {
      if (!editedRow) {
        return
      }
      if (!route.name || !route.callerNumber) {
        setEditedRow((prev) => (prev ? { ...prev, isSummited: true } : prev))

        return
      }
      if (route.id === 0) {
        // New route
        dispatch(
          asyncCreateRoute({
            name: route.name,
            callerNumber: route.callerNumber,
          }),
        )
      } else {
        // Existing route updated
        dispatch(
          asyncUpdateRoute(route.id, {
            name: route.name,
            callerNumber: route.callerNumber,
          }),
        )
      }
      setEditedRow(null)
    },
    [editedRow],
  )

  const handleDeleteRoute = useCallback((route: TRoute) => {
    if (editedRow) return
    setCurrentRoute(route)
    setModal({ modalName: MODAL_NAMES.QUESTION_MODAL, isOpen: true })
  }, [])

  const changeLimit = (option: SingleValue<TSelectOption>) => {
    if (!option) return
    dispatch(
      setPagination({
        page,
        limit: +(option.value ?? limit ?? 10),
        total,
      }),
    )
  }

  const onEditRow = (route: TRoute) => {
    if (editedRow) return
    setEditedRow({ id: route.id, route })
  }

  const onCancelEditRow = () => {
    setEditedRow(null)
  }
  const rows = useMemo(
    () =>
      [...(editedRow?.id === 0 ? [editedRow.route] : []), ...routes].map((r: TRoute) => ({
        row: {
          id: `${r.id}`,
          name:
            editedRow?.id === r.id ? (
              <Input
                error={
                  editedRow?.isSummited && !editedRow.route.name
                    ? t('validation.required-field')
                    : undefined
                }
                size="s"
                value={r.name}
                name={`routes[${r.id}].name`}
                onChange={(value) => {
                  setEditedRow((prev) =>
                    prev ? { ...prev, route: { ...prev.route, name: value } } : prev,
                  )
                }}
              />
            ) : (
              <InfoCell title={r.name} />
            ),
          callerNumber:
            editedRow?.id === r.id ? (
              <Input
                error={
                  editedRow?.isSummited && !editedRow.route.callerNumber
                    ? t('validation.required-field')
                    : undefined
                }
                size="s"
                value={r.callerNumber}
                width="100%"
                name={`routes[${r.id}].callerNumber`}
                onChange={(value) => {
                  setEditedRow((prev) =>
                    prev
                      ? { ...prev, route: { ...prev.route, callerNumber: value } }
                      : prev,
                  )
                }}
              />
            ) : (
              <InfoCell title={r.callerNumber} />
            ),
          edit:
            editedRow?.id === r.id ? (
              <>
                <IconButton
                  iconColor="main11"
                  onClick={() => handleUpdateRoute(editedRow.route)}
                >
                  <SuccessIcon width="20px" height="20px" />
                </IconButton>
                <IconButton iconColor="main13" onClick={() => onCancelEditRow()}>
                  <ErrorIcon width="20px" height="20px" />
                </IconButton>
              </>
            ) : (
              <IconButton
                disabled={!!editedRow}
                iconColor="main3"
                onClick={() => onEditRow(r)}
              >
                <EditIcon width="20px" height="20px" />
              </IconButton>
            ),
          delete: (
            <IconButton
              disabled={!!editedRow}
              iconColor="main13"
              onClick={() => handleDeleteRoute(r)}
            >
              <TrashIcon width="20px" height="20px" />
            </IconButton>
          ),
        },
      })),

    [routes, t, setModal, editedRow],
  )

  const header = [
    { label: t('headers.name'), value: 'name', width: '40%' },
    { label: t('headers.caller-number'), value: 'callerNumber', width: '40%' },
    { label: t('headers.edit'), value: 'edit', width: '10%' },
    { label: t('headers.delete'), value: 'delete', width: '10%' },
  ]

  return (
    <>
      <Container>
        <Panel>
          <Flex width="100%" justify="space-between" align="center" gap="16px">
            <Flex width="100%" justify="space-between" align="center" gap="16px">
              <Input
                disabled={!!editedRow}
                value={searchTerm}
                width="100%"
                maxWidth="374px"
                size="xs"
                name="search-user"
                placeholder={t('filters.placeholder.search-by-name')}
                startAdornment={<SearchFieldIcon />}
                startAdornmentStyles={{ paddingRight: '0 !important' }}
                endAdornment={
                  <BaseButton
                    onClick={() => setSearchTerm('')}
                    disabled={!searchTerm || !!editedRow}
                    startIcon={<CloseIcon />}
                  />
                }
                endAdornmentStyles={{ paddingRight: '0 !important' }}
                onChange={setSearchTerm}
                debounce={600}
              />
              <LimitSelect disabled={!!editedRow} limit={limit} onChange={changeLimit} />
            </Flex>
            <FilledButton
              disabled={!!editedRow}
              maxWidth="180px"
              width="100%"
              startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
              onClick={() => onEditRow({ id: 0, name: '', callerNumber: '' } as TRoute)}
            >
              {t('add-route')}
            </FilledButton>
          </Flex>
        </Panel>
        <TableContainer>
          <Table
            loading={isLoading}
            headerData={header as any}
            rowsData={rows as any}
            bodyCell={(props) => (
              <BodyCell height="auto" alignItems="start" {...props} whiteSpace="nowrap" />
            )}
            headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
            emptyComponent={
              <EmptyComponent text={t('empty-data')} isLoading={isLoading} />
            }
          />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            disabled={isLoading}
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={onChangePage}
          />
        </PaginationContainer>
      </Container>
      <QuestionModal
        confirmHandler={() => {
          if (currentRoute) {
            dispatch(deleteRoute(currentRoute.id))
          }
          resetModals()
        }}
        title={t('delete.title', { name: currentRoute?.name })}
        confirmLabel={t('delete.delete-btn')}
        cancelLabel={t('delete.cancel-btn')}
      />
    </>
  )
}
