import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { ViewIcon } from '@peiko/components/icons/ViewIcon'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { campaignsMock } from '../../mocks/campaignsMock'
import { InfoColumn } from '../../components/InfoColumn'
import { StatusChip } from '../../components/StatusChip'
import { ActionBtn } from '../../components/ActionBtn'

type CampaignRowKeys =
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

  const handleView = useCallback((id: number) => {
    // eslint-disable-next-line no-console
    console.log(`View ${id}`)
  }, [])

  const handleAction = useCallback((id: number) => {
    // eslint-disable-next-line no-console
    console.log(`Action ${id}`)
  }, [])

  const handleEdit = useCallback((id: number) => {
    // eslint-disable-next-line no-console
    console.log(`Edit ${id}`)
  }, [])

  const headers: THeader<CampaignRowKeys>[] = [
    { label: t('headers.campaign-name'), value: 'name' },
    { label: t('headers.creation-date'), value: 'date' },
    { label: t('headers.status'), value: 'status' },
    { label: t('headers.leads'), value: 'leads' },
    { label: t('headers.agents'), value: 'agents' },
    { label: t('headers.view'), value: 'view' },
    { label: t('headers.action'), value: 'action' },
    { label: t('headers.edit'), value: 'edit' },
    { label: t('headers.delete'), value: 'delete' },
  ]

  const rows = campaignsMock.map((campaign) => ({
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
        <ActionBtn status={campaign.status} onClick={() => handleAction(campaign.id)} />
      ),
      edit: (
        <IconButton onClick={() => handleEdit(campaign.id)} iconColor="transparent">
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton onClick={() => handleEdit(campaign.id)} iconColor="main13">
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
}
