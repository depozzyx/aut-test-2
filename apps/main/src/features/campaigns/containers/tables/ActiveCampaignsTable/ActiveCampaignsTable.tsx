import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useCampaignSort } from '@/features/campaigns/hooks/use-campaignSort'
import { CAMPAIGN_STATUSES, SORT_BY } from '@/features/campaigns/constants'
import { HeaderWithSort } from 'components/HeaderWithSort'
import { StatisticsTypeResponse } from '@/features/campaigns/types'
import { InfoCell } from '../../../components/InfoCell'
import {
  selectActiveCampaignsForView,
  selectIsLoading,
  setSelectedId,
} from '../../../store/campaigns'
import { formatCreatedAt } from '../../../utils/formatCreateAt'

type TActiveCampaignsRowKeys =
  | 'name'
  | 'date'
  | 'totalCalls'
  | 'onlineAgents'
  | 'onCallAgents'
  | 'waitingClients'
  | 'ringingClients'
  | 'edit'
  | 'delete'

export const ActiveCampaignsTable = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select, dispatch } = useRedux()

  const { setModal } = useModals()

  const { isLoading, data } = select(
    createStructuredSelector({
      isLoading: selectIsLoading,
      data: selectActiveCampaignsForView,
    }),
    shallowEqual,
  )

  const { handleSort } = useCampaignSort()
  const getTotalCalls = (statistic?: StatisticsTypeResponse): number => {
    if (statistic) {
      return (
        +(statistic.oncall_agents || 0) +
        +(statistic.ringing_clients || 0) +
        +(statistic.waiting_clients || 0)
      )
    }
    return 0
  }

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_CAMPAIGN, isOpen: true })
  }, [])

  const handleEditCampaign = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.EDIT_CAMPAIGN, isOpen: true })
  }, [])

  const headers: THeader<TActiveCampaignsRowKeys>[] = [
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
    { label: t('active-campaigns-headers.total-calls'), value: 'totalCalls' },
    { label: t('active-campaigns-headers.on-call-agents'), value: 'onCallAgents' },
    { label: t('active-campaigns-headers.online-agents'), value: 'onlineAgents' },
    { label: t('active-campaigns-headers.waiting-clients'), value: 'waitingClients' },
    { label: t('active-campaigns-headers.ringing-clients'), value: 'ringingClients' },
    { label: t('active-campaigns-headers.edit'), value: 'edit' },
    { label: t('active-campaigns-headers.delete'), value: 'delete' },
  ]

  const rows = data.map((campaign) => ({
    row: {
      id: campaign.id,
      name: <InfoCell title={campaign.name} />,
      date: <InfoCell title={formatCreatedAt(campaign.createdAt)} />,
      totalCalls: (
        <InfoCell title={`${getTotalCalls(campaign?.statistic)}`} highlightZero />
      ),
      onlineAgents: (
        <InfoCell title={`${campaign?.statistic?.online_agents}`} highlightZero />
      ),
      onCallAgents: (
        <InfoCell title={`${campaign?.statistic?.oncall_agents}`} highlightZero />
      ),
      waitingClients: (
        <InfoCell title={`${campaign?.statistic?.waiting_clients}`} highlightZero />
      ),
      ringingClients: (
        <InfoCell title={`${campaign?.statistic?.ringing_clients}`} highlightZero />
      ),
      edit: (
        <IconButton
          onClick={() => handleEditCampaign(campaign.id)}
          disabled={campaign.status !== CAMPAIGN_STATUSES.PAUSE}
          iconColor="transparent"
        >
          <EditIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <IconButton
          onClick={() => handleDelete(campaign.id)}
          disabled={campaign.status !== CAMPAIGN_STATUSES.PAUSE}
          iconColor="main13"
        >
          <TrashIcon width="24px" height="24px" />
        </IconButton>
      ),
    },
  }))

  return (
    <Flex padding="12px 0 0 0" direction="column" align="center">
      <Table
        loading={isLoading}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
    </Flex>
  )
}
