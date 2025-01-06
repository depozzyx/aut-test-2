import { memo, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ELeadsSortBy, TLeadData } from '@/api-rest/leads/types'
import { HeaderWithSort } from '@/components/HeaderWithSort'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { leadsApi } from '@/api-rest/leads'
import { handleRestError } from '@/features/common/error'
import dynamic from 'next/dynamic'
import { getLeadStatus } from '@/features/leads/containers/LeadsTable'
import { InfoColumn } from '../../components/InfoColumn'
import {
  getLeadStatuses,
  selectIsLoading,
  selectLeadsList,
  selectLeadStatuses,
  setLeadsSortBy,
} from '../../store/leads'
import { LeadsSelect } from '../LeadsSelect'

type TLeadsRowKeys =
  | 'id'
  | 'name'
  | 'phone'
  | 'timezone'
  | 'status'
  | 'source'
  | 'campaign'
  | 'selectLeads'
  | 'view'
  | 'leadId'

const LeadModal = dynamic(() => import('../modals').then((mod) => mod.LeadModal), {
  ssr: false,
})

export const LeadsTable = memo(({ reFetch }: { reFetch: () => void }): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const { select, dispatch } = useRedux()
  const { setModal, modalState } = useModals()

  const { data, isLoading } = select(
    createStructuredSelector({
      data: selectLeadsList,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const leadStatuses = select(selectLeadStatuses)

  const [leadData, setLeadData] = useState<TLeadData>()

  const getLeadData = async (id: number): Promise<boolean> => {
    const response = await leadsApi.getLead(id)
    setLeadData(undefined)
    const { data } = response
    if (data?.data) {
      data.data.status = getLeadStatus(leadStatuses, data.data.status)
      setLeadData(data.data)
      return true
    }
    return false
  }

  const handleView = async (id: number) => {
    try {
      const isLoaded = await getLeadData(id)
      if (isLoaded) {
        setModal({ modalName: MODAL_NAMES.VIEW_LEAD, isOpen: true })
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const isLeadModalOpen =
    modalState?.modalName === MODAL_NAMES.VIEW_LEAD && modalState.isOpen

  const headers: THeader<TLeadsRowKeys>[] = [
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-id')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.ID))}
        />
      ),
      value: 'leadId',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-name')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.NAME))}
        />
      ),
      value: 'name',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-phone')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.PHONE))}
        />
      ),
      value: 'phone',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-timezone')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.TIMEZONE))}
        />
      ),
      value: 'timezone',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-status')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.STATUS))}
        />
      ),
      value: 'status',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.lead-source')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.SOURCE))}
        />
      ),
      value: 'source',
    },
    {
      label: (
        <HeaderWithSort
          title={t('headers.campaign')}
          onClick={() => dispatch(setLeadsSortBy(ELeadsSortBy.CAMPAIGN))}
        />
      ),
      value: 'campaign',
    },
    { label: t('headers.view'), value: 'view' },
    { label: <LeadsSelect maxMenuHeight={200} width="213px" />, value: 'selectLeads' },
  ]

  const rows = data.map((lead) => ({
    row: {
      id: lead.id,
      leadId: <InfoColumn title={lead.id} />,
      name: <InfoColumn title={lead.name} />,
      phone: <InfoColumn title={lead.phone} />,
      timezone: <InfoColumn title={lead.timezone} />,
      status: <InfoColumn title={getLeadStatus(leadStatuses, lead?.status)} />,
      source: <InfoColumn title={lead.source} />,
      campaign: <InfoColumn title={lead?.leadList?.campaign?.name} />,
      view: (
        <IconButton onClick={() => handleView(lead.id)} iconColor="main3">
          <EyeIcon width="24px" height="24px" />
        </IconButton>
      ),
      selectLeads: <></>,
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
      />
      {isLeadModalOpen && leadData && (
        <LeadModal onSave={getLeadData} leadData={leadData} onClose={reFetch} />
      )}
    </>
  )
}, deepEqual)

LeadsTable.displayName = 'LeadsTable'
