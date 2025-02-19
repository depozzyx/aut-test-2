import React, { memo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ELeadsSortBy, TLeadOption } from '@/api-rest/leads/types'
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
import { LeadListStatusChip } from '@/features/leads/components/StatusChip'
import { Text } from '@peiko/components/Text/Text'

import {
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
  () => import('../modals').then((mod) => mod.LeadListModal),
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

  const isEditModalOpen =
    modalState?.modalName === MODAL_NAMES.EDIT_LEAD_LIST && modalState.isOpen

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
    {
      label: (
        <HeaderWithSort
          title={t('headers.list.active')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.ACTIVE))}
        />
      ),
      value: 'active',
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
          disabled={
            leadList.campaignStatus && leadList.campaignStatus !== CAMPAIGN_STATUSES.PAUSE
          }
        >
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton
          onClick={() => handleDelete(leadList.id)}
          iconColor="main13"
          disabled={
            leadList.campaignStatus && leadList.campaignStatus !== CAMPAIGN_STATUSES.PAUSE
          }
        >
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
        emptyComponent={
          <div
            style={{
              justifyItems: 'center',
              alignItems: 'center',
              flex: 4,
              marginTop: '4px',
            }}
          >
            <Text variant="f5" color="main4">
              {t('view-lead-list.emptyData')}
            </Text>
          </div>
        }
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
          onClose={onCloseEditLeadListModal}
        />
      )}
    </>
  )
}, deepEqual)

LeadListTable.displayName = 'LeadsListTable'
