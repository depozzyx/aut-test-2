import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { Table } from '@peiko/components/Table'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt' // move to common uitls
import { useManagerList } from '../../hooks/use-managersList'
import { InfoCell } from '../../components/InfoCell'
import { selectManagersList, setSelectedId } from '../../store/managers'
import { useManagersSort } from '../../hooks/use-managers-sort'
import { SORT_BY } from '../../constants'

type TManagerRowKeys =
  | 'id'
  | 'username'
  | 'date'
  | 'email'
  | 'pbxName'
  | 'edit'
  | 'managerId'

export const ManagerListTable = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const handleSort = useManagersSort()
  const { isLoading } = useManagerList()
  const managersList = select(selectManagersList, shallowEqual)

  const handleEditCampaign = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_MANAGER, isOpen: true })
  }, [])

  const headers: THeader<TManagerRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.id')}
          onClick={() => handleSort(SORT_BY.ID)}
        />
      ),
      value: 'managerId',
    },
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.username')}
          onClick={() => handleSort(SORT_BY.NAME)}
        />
      ),
      value: 'username',
    },
    {
      label: (
        <HeaderWithSort
          title={t('list-headers.creation-date')}
          onClick={() => handleSort(SORT_BY.CREATED_AT)}
        />
      ),
      value: 'date',
    },
    { label: t('list-headers.email'), value: 'email' },
    { label: t('list-headers.pbxName'), value: 'pbxName' },
    { label: t('list-headers.edit'), value: 'edit' },
  ]

  const rows = managersList.map((manager) => ({
    row: {
      id: manager.id,
      managerId: <InfoCell title={manager.id} />,
      username: <InfoCell title={manager.username || '-'} />,
      date: <InfoCell title={formatCreatedAt(manager.createdAt)} />,
      email: <InfoCell title={manager.email} />,
      pbxName: <InfoCell title={manager.pbxName || '-'} />,

      edit: (
        <IconButton
          onClick={() => handleEditCampaign(manager.id)}
          iconColor="transparent"
        >
          <EditIcon width="24px" height="24px" />
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
    />
  )
}
