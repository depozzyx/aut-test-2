import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { ViewIcon } from '@peiko/components/icons/ViewIcon'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { TCampaignStatus } from '@/features/campaigns/types'
import { InfoColumn } from '../../components/InfoColumn'
import { StatusChip } from '../../components/StatusChip'
import { ActionBtn } from '../../components/ActionBtn'
import {
  selectIsLoading,
  selectCampaignsListForView,
  setSelectedId,
  asyncUpdateCampaignStatus,
} from '../../store/campaigns'
import { formatCreatedAt } from '../../utils/formatCreateAt'

type TCampaignRowKeys =
  | 'view'
  | 'name'
  | 'action'
  | 'date'
  | 'status'
  | 'leads'
  | 'agents'
  | 'edit'
  | 'delete'

export const CampaignListTable = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { dispatch, select } = useRedux()
  const { setModal } = useModals()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectCampaignsListForView,
    }),
    shallowEqual,
  )

  const handleView = useCallback((id: number) => {
    // eslint-disable-next-line no-console
    console.log(`View ${id}`)
  }, [])

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_CAMPAIGN, isOpen: true })
  }, [])

  const handleAction = useCallback((id: number, currentStatus: TCampaignStatus) => {
    dispatch(asyncUpdateCampaignStatus(id, currentStatus))
  }, [])

  const handleEditCampaign = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_CAMPAIGN, isOpen: true })
  }, [])

  const headers: THeader<TCampaignRowKeys>[] = [
    { label: t('campaign-list-headers.campaign-name'), value: 'name' },
    { label: t('campaign-list-headers.creation-date'), value: 'date' },
    { label: t('campaign-list-headers.status'), value: 'status' },
    { label: t('campaign-list-headers.leads'), value: 'leads' },
    { label: t('campaign-list-headers.agents'), value: 'agents' },
    { label: t('campaign-list-headers.view'), value: 'view' },
    { label: t('campaign-list-headers.action'), value: 'action' },
    { label: t('campaign-list-headers.edit'), value: 'edit' },
    { label: t('campaign-list-headers.delete'), value: 'delete' },
  ]

  const rows = data.map((campaign) => ({
    row: {
      name: <InfoColumn title={campaign.name} />,
      date: <InfoColumn title={formatCreatedAt(campaign.createdAt)} />,
      status: <StatusChip status={campaign.status} />,
      leads: <InfoColumn title={campaign.leadCount} />,
      agents: <InfoColumn title={campaign.agentCount} />,
      view: (
        <IconButton onClick={() => handleView(campaign.id)} iconColor="main3">
          <ViewIcon width="24px" height="24px" />
        </IconButton>
      ),
      action: (
        <ActionBtn
          status={campaign.status}
          onClick={() => handleAction(campaign.id, campaign.status)}
        />
      ),
      edit: (
        <IconButton
          onClick={() => handleEditCampaign(campaign.id)}
          iconColor="transparent"
        >
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton onClick={() => handleDelete(campaign.id)} iconColor="main13">
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
