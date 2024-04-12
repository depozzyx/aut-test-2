import { memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { InfoColumn } from '../../components/InfoColumn'
import { TAgent } from '../../mocks/agentsMock'
import { CampaignsTooltip } from '../../components/CampaignsTooltip/CampaignsTooltip'

type TAgentRowKeys = 'name' | 'edit' | 'delete' | 'email' | 'role' | 'campaigns'

interface IAgentListTableProps {
  data: TAgent[]
  onDelete: (id: number) => void
  editAgent: (id: number) => void
}

export const AgentsListTable = memo(
  ({ data, onDelete, editAgent }: IAgentListTableProps): JSX.Element => {
    const { t } = useTranslation('agents')

    const headers: THeader<TAgentRowKeys>[] = [
      { label: t('headers.agent-name'), value: 'name' },
      { label: t('headers.email'), value: 'email' },
      { label: t('headers.role'), value: 'role' },
      { label: t('headers.campaigns'), value: 'campaigns' },
      { label: t('headers.edit'), value: 'edit' },
      { label: t('headers.delete'), value: 'delete' },
    ]

    const rows = data.map((agent) => ({
      row: {
        name: <InfoColumn title={agent.name} />,
        email: <InfoColumn title={agent.email} />,
        role: <InfoColumn title={t(`user:roles.${agent.role}`)} />,
        campaigns: <CampaignsTooltip campaigns={agent.campaigns} />,
        edit: (
          <IconButton onClick={() => editAgent(agent.id)} iconColor="transparent">
            <EditIcon width="24px" height="24px" />
          </IconButton>
        ),
        delete: (
          <IconButton onClick={() => onDelete(agent.id)} iconColor="main13">
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

AgentsListTable.displayName = 'AgentsListTable'
