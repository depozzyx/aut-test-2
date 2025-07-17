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

import {
  selectManagersList,
  setSelectedId,
  setOrderBy,
} from '@/features/managers/store/managers'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { userSelectors } from '@/features/common/user'
import { EPermissions } from '@/constants/profile'
import { useManagerList } from '../../hooks/use-managersList'
import { InfoCell } from '../../components/InfoCell'
import { SORT_BY } from '../../constants'

type TManagerRowKeys =
  | 'id'
  | 'username'
  | 'date'
  | 'email'
  | 'pbxName'
  | 'edit'
  | 'delete'

export const ManagerListTable = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const orderBy = select((state) => state.managers.orderBy)
  const order = select((state) => state.managers.order)

  const { isLoading } = useManagerList()
  const managersList = select(selectManagersList, shallowEqual)
  const user = select(userSelectors.user)

  const handleEditCampaign = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_MANAGER, isOpen: true })
  }, [])

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_MANAGER, isOpen: true })
  }, [])

  const headers: THeader<TManagerRowKeys>[] = [
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
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.pbxName')}
          onClick={() => dispatch(setOrderBy(SORT_BY.PBX_NAME))}
          order={orderBy === SORT_BY.PBX_NAME ? order : undefined}
        />
      ),
      value: 'pbxName',
    },
    ...(user.user?.permissions.includes(EPermissions.UPDATE_MANAGER)
      ? [{ label: t('list-headers.edit'), value: 'edit' } as THeader<TManagerRowKeys>]
      : []),
    ...(user.user?.permissions.includes(EPermissions.DELETE_MANAGER)
      ? [{ label: t('list-headers.delete'), value: 'delete' } as THeader<TManagerRowKeys>]
      : []),
  ]

  const rows = managersList.map((manager) => ({
    row: {
      id: manager.id,
      username: <InfoCell title={manager.username || '-'} />,
      date: <InfoCell title={formatCreatedAt(manager.createdAt)} />,
      email: <InfoCell title={manager.email} />,
      pbxName: <InfoCell title={manager.pbxName} />,

      edit: (
        <IconButton
          onClick={() => handleEditCampaign(manager.id)}
          iconColor="transparent"
        >
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton onClick={() => handleDelete(manager.id)} iconColor="main13">
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
