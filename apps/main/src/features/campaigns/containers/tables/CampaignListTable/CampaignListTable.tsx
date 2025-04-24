import React, { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useRouter } from 'next/router'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import {
  TCampaign,
  TCampaignActiveStatus,
  TCampaignStatus,
} from '@/features/campaigns/types'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'

import { HeaderWithSort } from 'components/HeaderWithSort'
import {
  CAMPAIGN_STATUSES,
  campaignDisabledActionStatusesMap,
  isCampaignDisabledAction,
  SORT_BY,
} from '@/features/campaigns/constants'
import { EyeIcon } from '@peiko/components/icons/EyeIcon/EyeIcon'
import { ROUTES } from '@/routes'
import { TCampaignOrderBy } from '@/api-rest/campaigns/types'
import { useCampaignUpdates } from '@/features/campaigns/hooks/use-active-campaigns-update'
import { ButtonWithTooltip } from '@/features/campaigns/containers/tables/CampaignListTable/ButtonWithTooltip'
import { InfoCell } from '../../../components/InfoCell'
import { StatusChip } from '../../../components/StatusChip'
import {
  selectIsLoading,
  selectCampaignsListForView,
  setSelectedId,
  asyncStartOrStopCampaign,
  setOrderBy,
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

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_CAMPAIGN, isOpen: true })
  }, [])

  useCampaignUpdates()

  const handleStartOrStop = async (id: number, currentStatus: TCampaignStatus) => {
    dispatch(asyncStartOrStopCampaign(id, currentStatus))
  }

  const handleEditCampaign = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_CAMPAIGN, isOpen: true })
  }, [])

  const validateAction = (campaign: TCampaign) => {
    let tooltipMsg = ''
    if (campaign.status === CAMPAIGN_STATUSES.HOLD) return tooltipMsg
    if (campaign.status === CAMPAIGN_STATUSES.COMPLETE) {
      tooltipMsg = t(`tooltip.cannot-action-complete-campaign`)
    } else if (campaign.leadCount === 0) {
      tooltipMsg = t(`tooltip.cannot-action-no-leads-campaign`)
    } else if (campaign.leadLists.filter((l) => l.active).length === 0) {
      tooltipMsg = t(`tooltip.cannot-action-inactive-lists-campaign`)
    }
    return tooltipMsg
  }

  const orderBy = select((state) => state.campaigns.orderBy)
  const order = select((state) => state.campaigns.order)

  const handleOrderBy = (orderBy: TCampaignOrderBy) => dispatch(setOrderBy(orderBy))

  const headers: THeader<TCampaignRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('active-campaigns-headers.campaign-name')}
          onClick={() => handleOrderBy(SORT_BY.NAME)}
          order={orderBy === SORT_BY.NAME ? order : undefined}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('active-campaigns-headers.creation-date')}
          onClick={() => handleOrderBy(SORT_BY.CREATED_AT)}
          order={orderBy === SORT_BY.CREATED_AT ? order : undefined}
        />
      ),
      value: 'date',
    },
    {
      label: (
        <HeaderWithSort
          title={t('campaign-list-headers.status')}
          onClick={() => handleOrderBy(SORT_BY.WORK_STATUS)}
          order={orderBy === SORT_BY.WORK_STATUS ? order : undefined}
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
        <ButtonWithTooltip
          showTooltip={!!validateAction(campaign)}
          buttonDisabled={!!validateAction(campaign)}
          onClick={() => handleStartOrStop(campaign.id, campaign.status)}
          tooltipText={validateAction(campaign)}
          iconType="info"
          buttonType="action"
          actionStatus={campaign.status}
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
        <ButtonWithTooltip
          showTooltip={isCampaignDisabledAction(campaign.status as TCampaignActiveStatus)}
          buttonDisabled={isCampaignDisabledAction(
            campaign.status as TCampaignActiveStatus,
          )}
          onClick={() => handleEditCampaign(campaign.id)}
          tooltipText={t(`tooltip.cannot-edit-active-campaign`, {
            status: campaignDisabledActionStatusesMap[campaign.status],
          })}
          iconType="info"
          buttonType="edit"
        />
      ),
      delete: (
        <ButtonWithTooltip
          showTooltip={isCampaignDisabledAction(campaign.status as TCampaignActiveStatus)}
          buttonDisabled={isCampaignDisabledAction(
            campaign.status as TCampaignActiveStatus,
          )}
          onClick={() => handleDelete(campaign.id)}
          tooltipText={t(`tooltip.cannot-delete-active-campaign`, {
            status: campaignDisabledActionStatusesMap[campaign.status],
          })}
          iconType="info"
          buttonType="delete"
        />
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
