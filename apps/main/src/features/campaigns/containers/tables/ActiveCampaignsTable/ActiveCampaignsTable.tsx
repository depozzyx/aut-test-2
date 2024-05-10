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
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useCampaignSort } from '@/features/campaigns/hooks/use-campaignSort'
import { SORT_BY } from '@/features/campaigns/constants'
import { HeaderWithSort } from 'components/HeaderWithSort'
import { InfoColumn } from '../../../components/InfoColumn'
import {
  selectActiveCampaignsForView,
  selectIsLoading,
  setSelectedId,
} from '../../../store/campaigns'
import { formatCreatedAt } from '../../../utils/formatCreateAt'
import { useCallFrequency } from '../../../hooks/use-callFrequency'

type TActiveCampaignsRowKeys =
  | 'name'
  | 'date'
  | 'callVolume'
  | 'callAnswerRate'
  | 'conversionRate'
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
  const { getCallFrequencyLabel } = useCallFrequency()

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
    { label: t('active-campaigns-headers.call-volume'), value: 'callVolume' },
    { label: t('active-campaigns-headers.response-rate'), value: 'callAnswerRate' },
    { label: t('active-campaigns-headers.conversion-rate'), value: 'conversionRate' },
    { label: t('active-campaigns-headers.edit'), value: 'edit' },
    { label: t('active-campaigns-headers.delete'), value: 'delete' },
  ]

  const rows = data.map((campaign) => ({
    row: {
      name: <InfoColumn title={campaign.name} />,
      date: <InfoColumn title={formatCreatedAt(campaign.createdAt)} />,
      callVolume: <InfoColumn title={getCallFrequencyLabel(campaign.intensity)} />,
      callAnswerRate: <InfoColumn title={`${campaign.callAnswerRate}%`} />,
      conversionRate: <InfoColumn title={`${campaign.conversionRate}%`} />,
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
