import { useCallback, memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { deepEqual } from '@/utils/deep-equal'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { Table } from '@peiko/components/Table'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { Pagination } from '@peiko/components/Pagination'
import { THeader } from '@peiko/components/Table/types'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { InfoColumn } from '../../components/InfoColumn'
import {
  selectCampaigns,
  selectCampaignsPagination,
  setSelectedId,
} from '../../store/active-campaigns'

type TActiveCampaignsRowKeys =
  | 'name'
  | 'date'
  | 'callVolume'
  | 'responseRate'
  | 'conversionRate'
  | 'edit'
  | 'delete'

export const ActiveCampaignsTable = memo((): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { select, dispatch } = useRedux()

  const { setModal } = useModals()

  const {
    pagination: { total, page },
    campaigns,
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      campaigns: selectCampaigns,
    }),
    shallowEqual,
  )

  const handleDelete = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.DELETE_CAMPAIGN, isOpen: true })
  }, [])

  const handleEdit = useCallback((id: number) => {
    // eslint-disable-next-line no-console
    console.log(`Edit ${id}`)
  }, [])

  const headers: THeader<TActiveCampaignsRowKeys>[] = [
    { label: t('active-campaigns-headers.campaign-name'), value: 'name' },
    { label: t('active-campaigns-headers.creation-date'), value: 'date' },
    { label: t('active-campaigns-headers.call-volume'), value: 'callVolume' },
    { label: t('active-campaigns-headers.response-rate'), value: 'responseRate' },
    { label: t('active-campaigns-headers.conversion-rate'), value: 'conversionRate' },
    { label: t('active-campaigns-headers.edit'), value: 'edit' },
    { label: t('active-campaigns-headers.delete'), value: 'delete' },
  ]

  const rows = campaigns.map((campaign) => ({
    row: {
      name: <InfoColumn title={campaign.name} />,
      date: <InfoColumn title={campaign.date} />,
      callVolume: <InfoColumn title={campaign.callVolume} />,
      responseRate: <InfoColumn title={`${campaign.responseRate}%`} />,
      conversionRate: <InfoColumn title={`${campaign.conversionRate}%`} />,
      edit: (
        <IconButton onClick={() => handleEdit(campaign.id)} iconColor="transparent">
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
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
      <Flex padding="40px 0 0 0">
        <Pagination lastPage={total} currentPage={page} />
      </Flex>
    </Flex>
  )
}, deepEqual)

ActiveCampaignsTable.displayName = 'ActiveCampaignsTable'
