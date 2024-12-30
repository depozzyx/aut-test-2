import { memo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ELeadsSortBy } from '@/api-rest/leads/types'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import dynamic from 'next/dynamic'
import { selectLeadLists, selectIsLoading } from '@/features/leads/store/lead-list'
import { setLeadsSortBy } from '@/features/leads/store/leads'
import { TrashIcon } from '@peiko/components/icons/TrashIcon/TrashIcon'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { handleRestError } from '@/features/common/error'
import { apiLeadList } from '@/api-rest/lead-list'
import { StatusChip } from '@/features/campaigns/components/StatusChip'
import { TLeadListData } from '@/api-rest/lead-list/types'
import { InfoColumn } from '../../components/InfoColumn'

type TLeadListRowKeys =
  | 'id'
  | 'name'
  | 'leadCount'
  | 'campaignName'
  | 'campaignStatus'
  | 'lastCallDate'
  | 'view'
  | 'edit'
  | 'delete'

const LeadListModal = dynamic(
  () => import('../modals').then((mod) => mod.LeadListModal),
  {
    ssr: false,
  },
)

export const LeadListTable = memo(({ reFetch }: { reFetch: () => void }): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const { select, dispatch } = useRedux()
  const { setModal, modalState } = useModals()

  const { data, isLoading } = select(
    createStructuredSelector({
      data: selectLeadLists,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  const [leadList, setLeadList] = useState<TLeadListData>()

  // const getLeadList = async (id: number) => {
  //   try {
  //     const { data } = await apiLeadList.getLeadList(id)
  //     if (data?.data) {
  //       setLeadList(data.data)
  //     }
  //   } catch (e) {
  //     handleRestError({ e, dispatch })
  //   }
  // }
  const handleView = async (id: number) => {
    // await getLeadList(id)
    const targetLeadList = data.find((list) => list.id === id)
    if (targetLeadList) {
      setLeadList(targetLeadList)
      setModal({ modalName: MODAL_NAMES.VIEW_LEAD_LIST, isOpen: true })
    }
  }

  const handleEdit = async (id: number) => {
    // todo
    console.warn(id)
    // await getLeadList(id)
    // if (leadList) {
    //   setModal({ modalName: MODAL_NAMES.VIEW_LEAD_LIST, isOpen: true })
    // }
  }

  const handleDelete = async (id: number) => {
    try {
      await apiLeadList.deleteLeadList(id)
      reFetch()
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const isViewModalOpen =
    modalState?.modalName === MODAL_NAMES.VIEW_LEAD_LIST && modalState.isOpen

  const headers: THeader<TLeadListRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.id')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.ID))}
        />
      ),
      value: 'id',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.name')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.NAME))}
        />
      ),
      value: 'name',
    },
    { label: t('headers.list.leadCount'), value: 'leadCount' },
    { label: t('headers.list.campaignName'), value: 'campaignName' },
    { label: t('headers.list.campaignStatus'), value: 'campaignStatus' },
    { label: t('headers.list.lastCallDate'), value: 'lastCallDate' },
    { label: t('headers.list.view'), value: 'view' },
    { label: t('headers.list.edit'), value: 'edit' },
    { label: t('headers.list.delete'), value: 'delete' },
  ]

  const rows = data.map((leadList) => ({
    row: {
      id: leadList.id,
      name: <InfoColumn title={leadList.name} />,
      leadCount: <InfoColumn title={leadList.leadCount} />,
      campaignName: <InfoColumn title={leadList.campaignName} />,
      campaignStatus: leadList?.campaignStatus && (
        <StatusChip status={leadList?.campaignStatus} />
      ),
      lastCallDate: (
        <InfoColumn
          title={leadList?.lastCallDate ? formatCreatedAt(leadList.lastCallDate) : ''}
        />
      ),
      view: (
        <IconButton onClick={() => handleView(leadList.id)} iconColor="main3">
          <EyeIcon width="24px" height="24px" />
        </IconButton>
      ),
      edit: (
        <IconButton
          onClick={() => handleEdit(leadList.id)}
          iconColor="transparent"
          disabled
        >
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton onClick={() => handleDelete(leadList.id)} iconColor="main13">
          <TrashIcon width="24px" height="24px" />
        </IconButton>
      ),
    },
  }))

  return (
    <>
      <Table
        minHeight={isLoading ? undefined : '300px'}
        loading={isLoading}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
      {isViewModalOpen && leadList && (
        <LeadListModal onClose={reFetch} leadListData={leadList} />
      )}
    </>
  )
}, deepEqual)

LeadListTable.displayName = 'LeadsTable'
