import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { Table } from '@peiko/components/Table'
import { useRedux } from '@/hooks/use-redux'
// import { useModals } from '@/features/common/modals/hooks/use-modals'
// import { MODAL_NAMES } from '@/features/common/modals/constants'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useManagerList } from '../../hooks/use-managersList'
import { InfoCell } from '../../components/InfoCell'
import { selectManagersList, setSelectedId } from '../../store/managers'

type TManagerRowKeys = 'id' | 'username' | 'email' | 'pbxName' | 'edit' | 'delete'

export const ManagerListTable = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  // const { setModal } = useModals()

  const { isLoading } = useManagerList()
  const managersList = select(selectManagersList, shallowEqual)

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    // setModal({ modalName: MODAL_NAMES.DELETE_CAMPAIGN, isOpen: true })
  }, [])

  const handleEditCampaign = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    // setModal({ modalName: MODAL_NAMES.EDIT_CAMPAIGN, isOpen: true })
  }, [])

  const headers: THeader<TManagerRowKeys>[] = [
    { label: t('list-headers.id'), value: 'id' },
    { label: t('list-headers.username'), value: 'username' },
    { label: t('list-headers.email'), value: 'email' },
    { label: t('list-headers.pbxName'), value: 'pbxName' },
    { label: t('list-headers.edit'), value: 'edit' },
    { label: t('list-headers.delete'), value: 'delete' },
  ]

  const rows = managersList.map((manager) => ({
    row: {
      id: <InfoCell title={manager.id} />,
      username: <InfoCell title={manager.username} />,
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
    />
  )
}
