import React, { memo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ELeadsOrderBy, TLeadOption } from '@/api-rest/leads/types'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import dynamic from 'next/dynamic'
import {
  selectLeadLists,
  selectIsLoading,
  setLeadListOrderBy,
} from '@/features/leads/store/lead-list'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { handleRestError } from '@/features/common/error'
import { apiLeadList } from '@/api-rest/lead-list'
import { StatusChip } from '@/features/campaigns/components/StatusChip'
import { LeadListStatusChip } from '@/features/leads/components/StatusChip'
import { ButtonWithTooltip } from '@peiko/components/Tooltip'

import {
  ELeadListOrderBy,
  TLeadCallStatusStatisticRawData,
  TLeadListData,
} from '@/api-rest/lead-list/types'
import { leadsApi } from '@/api-rest/leads'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'
import { InfoColumn } from '../../components/InfoColumn'

type TLeadListRowKeys =
  | 'id'
  | 'name'
  | 'active'
  | 'leadCount'
  | 'campaignName'
  | 'campaignStatus'
  | 'lastCallDate'
  | 'view'
  | 'edit'
  | 'delete'

const LeadListModal = dynamic(
  () => import('../modals').then((mod) => mod.ViewLeadListModal),
  {
    ssr: false,
  },
)

const EditLeadListModal = dynamic(
  () => import('../modals').then((mod) => mod.EditLeadListModal),
  {
    ssr: false,
  },
)

const ConfirmDeleteModal = dynamic(
  () =>
    import('@/components/modals/ConfirmDeleteModal').then(
      (mod) => mod.ConfirmDeleteModal,
    ),
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

  const [leadListCallStatisticData, setLeadListCallStatisticData] =
    useState<TLeadCallStatusStatisticRawData>()

  const getStatData = async (id: number) => {
    try {
      const { data } = await apiLeadList.getLeadListCallStatistic(id)
      if (data?.data) {
        setLeadListCallStatisticData(data.data)
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const handleView = async (id: number) => {
    const targetLeadList = data.find((list) => list.id === id)
    if (targetLeadList) {
      setLeadList(targetLeadList)
      await getStatData(id)
      setModal({ modalName: MODAL_NAMES.VIEW_LEAD_LIST, isOpen: true })
    }
  }

  const [assignedLeads, setAssignedLeads] = useState<TLeadOption[]>([])

  const getAllLeadsOptions = async (id: number) => {
    try {
      const { data } = await leadsApi.getLeadsForSelect(id)
      if (data?.data) {
        setAssignedLeads(data.data)
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const handleEdit = async (id: number) => {
    const targetLeadList = data.find((list) => list.id === id)
    if (targetLeadList) {
      await getAllLeadsOptions(id)
      setLeadList(targetLeadList)
      setModal({ modalName: MODAL_NAMES.EDIT_LEAD_LIST, isOpen: true })
    }
  }

  const onCloseEditLeadListModal = () => {
    setAssignedLeads([])
    reFetch()
  }

  const [leadListId, setLeadListId] = useState(0)

  const handleDelete = async () => {
    try {
      await apiLeadList.deleteLeadList(leadListId)
      reFetch()
      setLeadListId(0)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const confirmDelete = (id: number) => {
    setLeadListId(id)
    setModal({ modalName: MODAL_NAMES.DELETE_CONFIRMATION, isOpen: true })
  }

  const isViewModalOpen =
    modalState?.modalName === MODAL_NAMES.VIEW_LEAD_LIST && modalState.isOpen

  const isEditModalOpen =
    modalState?.modalName === MODAL_NAMES.EDIT_LEAD_LIST && modalState.isOpen

  const orderBy = select((state) => state.leadList.orderBy)
  const order = select((state) => state.leadList.order)

  const headers: THeader<TLeadListRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.id')}
          onClick={() => dispatch(setLeadListOrderBy(ELeadListOrderBy.ID))}
          order={orderBy === ELeadListOrderBy.ID ? order : undefined}
        />
      ),
      value: ELeadsOrderBy.ID,
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.name')}
          onClick={() => dispatch(setLeadListOrderBy(ELeadListOrderBy.NAME))}
          order={orderBy === ELeadListOrderBy.NAME ? order : undefined}
        />
      ),
      value: ELeadsOrderBy.NAME,
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.active')}
          onClick={() => dispatch(setLeadListOrderBy(ELeadListOrderBy.ACTIVE))}
          order={orderBy === ELeadListOrderBy.ACTIVE ? order : undefined}
        />
      ),
      value: ELeadsOrderBy.ACTIVE,
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
      active: <LeadListStatusChip status={leadList.active ? 'active' : 'inactive'} />,
      leadCount: <InfoColumn title={leadList.leadCount} />,
      campaignName: <InfoColumn title={leadList.campaignName} />,
      campaignStatus: leadList?.campaignStatus && (
        <StatusChip status={leadList?.campaignStatus} />
      ),
      lastCallDate: (
        <InfoColumn
          title={
            leadList?.lastCallDate ? formatCreatedAt(leadList.lastCallDate, true) : ''
          }
        />
      ),
      view: (
        <IconButton onClick={() => handleView(leadList.id)} iconColor="main3">
          <EyeIcon width="24px" height="24px" />
        </IconButton>
      ),
      edit: (
        <ButtonWithTooltip
          showTooltip={leadList.campaignStatus === CAMPAIGN_STATUSES.ACTIVE}
          buttonDisabled={leadList.campaignStatus === CAMPAIGN_STATUSES.ACTIVE}
          onClick={() => handleEdit(leadList.id)}
          tooltipText={t(`tooltip.cannot-edit-active-campaign`)}
          iconType="info"
          buttonType="edit"
        />
      ),
      delete: (
        <ButtonWithTooltip
          showTooltip={leadList.campaignStatus === CAMPAIGN_STATUSES.ACTIVE}
          buttonDisabled={leadList.campaignStatus === CAMPAIGN_STATUSES.ACTIVE}
          onClick={() => confirmDelete(leadList.id)}
          tooltipText={t(`tooltip.cannot-delete-active-campaign`)}
          iconType="info"
          buttonType="delete"
        />
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
        emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
      />
      {isViewModalOpen && leadList && (
        <LeadListModal
          onClose={reFetch}
          leadListData={leadList}
          stats={leadListCallStatisticData}
        />
      )}
      {isEditModalOpen && leadList && (
        <EditLeadListModal
          leadListData={leadList}
          assignedLeads={assignedLeads}
          initialLeadIds={assignedLeads.map((l) => l.value)}
          onClose={onCloseEditLeadListModal}
        />
      )}
      <ConfirmDeleteModal
        title="Are you sure you want to delete it?"
        confirmAction={handleDelete}
      />
    </>
  )
}, deepEqual)

LeadListTable.displayName = 'LeadsListTable'
