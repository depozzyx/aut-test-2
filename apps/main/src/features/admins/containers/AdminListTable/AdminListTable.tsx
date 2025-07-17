import React, { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'

import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { InfoCell } from '../../components/InfoCell'
import { SORT_BY } from '../../constants'
import { useAdminsList } from '../../hooks/use-adminsList'
import { selectAdminsList, setOrderBy, setSelectedId } from '../../store/admins'

type TAdminRowKeys = 'id' | 'username' | 'date' | 'email' | 'pbxName' | 'edit' | 'delete'

export const AdminListTable = (): JSX.Element => {
  const { t } = useTranslation('admins')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const orderBy = select((state) => state.admins.orderBy)
  const order = select((state) => state.admins.order)

  const { isLoading } = useAdminsList()
  const adminsList = select(selectAdminsList, shallowEqual)

  const handleEditAdmin = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_ADMIN, isOpen: true })
  }, [])

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_ADMIN, isOpen: true })
  }, [])

  const headers: THeader<TAdminRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.username')}
          onClick={() => dispatch(setOrderBy(SORT_BY.NAME))}
          order={orderBy === SORT_BY.NAME ? order : undefined}
        />
      ),

      value: 'username',
    },
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.creation-date')}
          onClick={() => dispatch(setOrderBy(SORT_BY.CREATED_AT))}
          order={orderBy === SORT_BY.CREATED_AT ? order : undefined}
        />
      ),
      value: 'date',
    },
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.email')}
          onClick={() => dispatch(setOrderBy(SORT_BY.EMAIL))}
          order={orderBy === SORT_BY.EMAIL ? order : undefined}
        />
      ),
      value: 'email',
    },
    { label: t('list-headers.edit'), value: 'edit' },
    { label: t('list-headers.delete'), value: 'delete' },
  ]

  const rows = adminsList.map((admin) => ({
    row: {
      id: admin.id,
      username: <InfoCell title={admin.username || '-'} />,
      date: <InfoCell title={formatCreatedAt(admin.createdAt)} />,
      email: <InfoCell title={admin.email} />,
      pbxName: <InfoCell title={admin.pbxName} />,

      edit: (
        <IconButton onClick={() => handleEditAdmin(admin.id)} iconColor="transparent">
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton onClick={() => handleDelete(admin.id)} iconColor="main13">
          <TrashIcon width="24px" height="24px" />
        </IconButton>
      ),
    },
  }))

  return (
    <Table
      loading={isLoading}
      headerData={headers}
      rowsData={rows}
      bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
      headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
    />
  )
}
