import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useRouter } from 'next/router'
import { Table } from '@peiko/components/Table'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { TCampaignStatus } from '@/features/campaigns/types'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { HeaderWithSort } from 'components/HeaderWithSort'
import { SORT_BY } from '@/features/campaigns/constants'
import { useCampaignSort } from '@/features/campaigns/hooks/use-campaignSort'
import { EyeIcon } from '@peiko/components/icons/EyeIcon/EyeIcon'
import { ROUTES } from '@/routes'
import { InfoCell } from '../../../components/InfoCell'
import { StatusChip } from '../../../components/StatusChip'
import { ActionBtn } from '../../../components/ActionBtn'
import {
  selectIsLoading,
  selectCampaignsListForView,
  setSelectedId,
  asyncUpdateCampaignStatus,
} from '../../../store/campaigns'
import { formatCreatedAt } from '../../../utils/formatCreateAt'

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
  const { push } = useRouter()
  const { dispatch, select } = useRedux()
  const { setModal } = useModals()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectCampaignsListForView,
    }),
    shallowEqual,
  )

  const { handleSort } = useCampaignSort()

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
    {
      label: (
        <HeaderWithSort
          title={t('active-campaigns-headers.campaign-name')}
          onClick={() => handleSort(SORT_BY.NAME)}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('active-campaigns-headers.creation-date')}
          onClick={() => handleSort(SORT_BY.CREATED_AT)}
        />
      ),
      value: 'date',
    },
    {
      label: (
        <HeaderWithSort
          title={t('campaign-list-headers.status')}
          onClick={() => handleSort(SORT_BY.WORK_STATUS)}
        />
      ),
      value: 'status',
    },
    { label: t('campaign-list-headers.leads'), value: 'leads' },
    { label: t('campaign-list-headers.agents'), value: 'agents' },
    { label: t('campaign-list-headers.action'), value: 'action' },
    { label: t('campaign-list-headers.view'), value: 'view' },
    { label: t('campaign-list-headers.edit'), value: 'edit' },
    { label: t('campaign-list-headers.delete'), value: 'delete' },
  ]

  const rows = data.map((campaign) => ({
    row: {
      id: campaign.id,
      name: <InfoCell title={campaign.name} />,
      date: <InfoCell title={formatCreatedAt(campaign.createdAt)} />,
      status: <StatusChip status={campaign.status} />,
      leads: <InfoCell title={campaign.leadCount} />,
      agents: <InfoCell title={campaign.agentCount} />,
      action: (
        <ActionBtn
          status={campaign.status}
          onClick={() => handleAction(campaign.id, campaign.status)}
        />
      ),
      view: (
        <IconButton
          onClick={() => push(ROUTES.CAMPAIGN_VIEW(campaign.id))}
          iconColor="main3"
        >
          <EyeIcon width="24px" height="24px" />
        </IconButton>
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
