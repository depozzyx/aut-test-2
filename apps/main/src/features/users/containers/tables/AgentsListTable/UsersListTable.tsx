import React, { useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import {
  asyncToggleBlockUser,
  selectIsLoadingUsers,
  selectOrder,
  selectOrderBy,
  selectUsersList,
  setOrderBy,
  setSelectedId,
} from '@/features/users/store/users'
import { SuccessIcon } from '@peiko/components/icons/SuccessIcon'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { ERoles } from '@/constants/profile'
import { InfoColumn } from '@/components/InfoColumn'
import { roleUserTranslationKey, USER_ORDER_BY } from '@/features/users/constants'
import { CampaignsTooltip } from '@/features/agents/components/CampaignsTooltip'

export type TUserRowKeys =
  | 'username'
  | 'email'
  | 'pbxName'
  | 'date'
  | 'edit'
  | 'delete'
  | 'campaigns'
  | 'block'
  | 'status'

export const UsersListTable = ({
  role,
  columns = [
    'username',
    'email',
    'status',
    'pbxName',
    'date',
    'edit',
    'delete',
    'campaigns',
    'block',
  ],
}: {
  role: ERoles
  columns?: TUserRowKeys[]
}): JSX.Element => {
  const { t } = useTranslation(
    roleUserTranslationKey[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN],
  )
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const { isLoading, data, orderBy, order } = select(
    createStructuredSelector({
      isLoading: selectIsLoadingUsers,
      data: selectUsersList,
      orderBy: selectOrderBy,
      order: selectOrder,
    }),
    shallowEqual,
  )

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_USER, isOpen: true })
  }, [])

  const handleEditUser = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_USER, isOpen: true })
  }, [])

  const handleBlock = useCallback((id: number) => {
    dispatch(asyncToggleBlockUser(role, id))
  }, [])

  const headers: THeader<TUserRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.username')}
          onClick={() => dispatch(setOrderBy(USER_ORDER_BY.USERNAME))}
          order={orderBy === USER_ORDER_BY.USERNAME ? order : undefined}
        />
      ),
      value: 'username' as TUserRowKeys,
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.email')}
          onClick={() => dispatch(setOrderBy(USER_ORDER_BY.EMAIL))}
          order={orderBy === USER_ORDER_BY.EMAIL ? order : undefined}
        />
      ),
      value: 'email' as TUserRowKeys,
    },
    { label: t('headers.status'), value: 'status' as TUserRowKeys },
    {
      label: (
        <HeaderWithSort
          title={t('headers.pbxName')}
          onClick={() => dispatch(setOrderBy(USER_ORDER_BY.PBX_NAME))}
          order={orderBy === USER_ORDER_BY.PBX_NAME ? order : undefined}
        />
      ),
      value: 'pbxName' as TUserRowKeys,
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.creation-date')}
          onClick={() => dispatch(setOrderBy(USER_ORDER_BY.CREATED_AT))}
          order={orderBy === USER_ORDER_BY.CREATED_AT ? order : undefined}
        />
      ),
      value: 'date' as TUserRowKeys,
    },
    { label: t('headers.campaigns'), value: 'campaigns' as TUserRowKeys },
    { label: t('headers.edit'), value: 'edit' as TUserRowKeys },
    { label: t('headers.block'), value: 'block' as TUserRowKeys },
    { label: t('headers.delete'), value: 'delete' as TUserRowKeys },
  ].filter((header: THeader<TUserRowKeys>) => columns.includes(header.value))

  const rows = data.map((user) => ({
    row: {
      id: user.id,
      username: <InfoColumn title={user.username} />,
      email: <InfoColumn title={user.email} />,
      pbxName: <InfoColumn title={user.pbxName} />,
      status: <InfoColumn title={user.status} />,
      date: <InfoColumn title={formatCreatedAt(user.createdAt)} />,
      campaigns: (
        <CampaignsTooltip
          campaigns={'assignedCampaigns' in user ? user.assignedCampaigns : []}
        />
      ),
      edit: (
        <IconButton onClick={() => handleEditUser(user.id)} iconColor="transparent">
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton onClick={() => handleDelete(user.id)} iconColor="main13">
          <TrashIcon width="24px" height="24px" />
        </IconButton>
      ),
      block: (
        <IconButton
          iconColor={user.status === 'blocked' ? 'main11' : 'main24'}
          onClick={() => handleBlock(user.id)}
        >
          {user.status === 'blocked' ? (
            <SuccessIcon width="24px" height="24px" />
          ) : (
            <ErrorIcon width="24px" height="24px" />
          )}
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
