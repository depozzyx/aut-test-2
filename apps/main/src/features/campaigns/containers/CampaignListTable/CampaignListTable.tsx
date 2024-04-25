import { useCallback, memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { ViewIcon } from '@peiko/components/icons/ViewIcon'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { InfoColumn } from '../../components/InfoColumn'
import { StatusChip } from '../../components/StatusChip'
import { ActionBtn } from '../../components/ActionBtn'
import { TCampaign } from '../../mocks/campaignsMock'

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

interface ICampaignListTableProps {
  data: TCampaign[]
  onDelete: (id: number) => void
  changeStatus: (id: number) => void
  editCampaign: (id: number) => void
}

export const CampaignListTable = memo(
  ({
    data,
    onDelete,
    changeStatus,
    editCampaign,
  }: ICampaignListTableProps): JSX.Element => {
    const { t } = useTranslation('campaigns')

    const handleView = useCallback((id: number) => {
      // eslint-disable-next-line no-console
      console.log(`View ${id}`)
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
        date: <InfoColumn title={campaign.date} />,
        status: <StatusChip status={campaign.status} />,
        leads: <InfoColumn title={campaign.leads} />,
        agents: <InfoColumn title={campaign.agents} />,
        view: (
          <IconButton onClick={() => handleView(campaign.id)} iconColor="main3">
            <ViewIcon width="24px" height="24px" />
          </IconButton>
        ),
        action: (
          <ActionBtn status={campaign.status} onClick={() => changeStatus(campaign.id)} />
        ),
        edit: (
          <IconButton onClick={() => editCampaign(campaign.id)} iconColor="transparent">
            <EditIcon width="24px" height="24px" />
          </IconButton>
        ),
        delete: (
          <IconButton onClick={() => onDelete(campaign.id)} iconColor="main13">
            <TrashIcon width="24px" height="24px" />
          </IconButton>
        ),
      },
    }))

    return (
      <Table
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
    )
  },
  deepEqual,
)

CampaignListTable.displayName = 'CampaignListTable'
