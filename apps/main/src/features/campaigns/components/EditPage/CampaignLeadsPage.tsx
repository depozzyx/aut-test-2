import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { useRedux } from '@/hooks/use-redux'
import { ELeadsOrderBy } from '@/api-rest/leads/types'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { handleRestError } from '@/features/common/error'
import { apiLeadList } from '@/api-rest/lead-list'
import { LeadListStatusChip } from '@/features/leads/components/StatusChip'

import {
  TLeadCallStatusStatisticRawData,
  TLeadListData,
} from '@/api-rest/lead-list/types'
import { isCampaignDisabledAction } from '@/features/campaigns/constants'
import { TCampaignActiveStatus } from '@/features/campaigns/types'
import { ButtonWithTooltip } from '@/features/campaigns/containers/tables/CampaignListTable/ButtonWithTooltip'
import { TFormik } from '@peiko/types/formik'
import dynamic from 'next/dynamic'
import { TCampaignById } from '@/api-rest/campaigns/types'
import { LeadListsSelect } from '@/features/common/FormInputs/LeadListsMultiSelect/LeadListsMultiSelect'
import { InfoColumn } from '@/components/InfoColumn'
import { Flex } from '@/components/Flex'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal'
import { DropdownMenu } from '@/components/DropdownMenu'
import { TValue } from '@/components/DropdownMenu/DropdownMenu'
import { TEditCampaignFormValues } from '../../hooks/useCampaignEdit'

const LeadListModal = dynamic(
  () => import('@/features/leads/containers/modals').then((mod) => mod.ViewLeadListModal),
  {
    ssr: false,
  },
)
type TLeadListRowKeys =
  | 'id'
  | 'name'
  | 'active'
  | 'leadCount'
  | 'lastCallDate'
  | 'view'
  | 'delete'

const TriggerChip = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & { active: boolean }
>(({ active, style, ...rest }, ref) => (
  <button
    ref={ref}
    type="button"
    // make clickable/focusable, but visually just the chip
    style={{
      all: 'unset',
      cursor: 'pointer',
      display: 'inline-block',
      lineHeight: 0,
      // allow DropdownMenu to size/position correctly
      ...style,
    }}
    {...rest}
  >
    <LeadListStatusChip cursor="pointer" status={active ? 'active' : 'inactive'} />
  </button>
))
TriggerChip.displayName = 'TriggerChip'

export const CampaignLeadsPage = ({
  formik,
  campaign,
}: {
  formik: TFormik<TEditCampaignFormValues>
  campaign: TCampaignById
}): JSX.Element => {
  const { t } = useTranslation('campaign-edit')
  const { dispatch } = useRedux()
  const { setModal, modalState } = useModals()

  const [leadList, setLeadList] = useState<TLeadListData>()
  const [leadListRows, setLeadListRows] = useState<TLeadListData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [leadListCallStatisticData, setLeadListCallStatisticData] =
    useState<TLeadCallStatusStatisticRawData>()

  const reFetch = async () => {
    setIsLoading(true)
    try {
      if (!formik.values.leadList.length) {
        setLeadListRows([])
        return
      }
      const response = await apiLeadList.getLeadLists({
        ids: formik.values.leadList.map((item) => item.value),
        page: 1,
        limit: formik.values.leadList.length,
      })
      setLeadListRows(response.data.data.data || [])
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      setIsLoading(false)
    }
  }
  const getStatData = async (id: number) => {
    try {
      const { data } = await apiLeadList.getLeadListCallStatistic(id)
      if (data?.data) {
        setLeadListCallStatisticData(data.data)
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const handleView = async (id: number) => {
    const targetLeadList = leadListRows.find((list) => list.id === id)
    if (targetLeadList) {
      setLeadList(targetLeadList)
      await getStatData(id)
      setModal({ modalName: MODAL_NAMES.VIEW_LEAD_LIST, isOpen: true })
    }
  }

  const [leadListId, setLeadListId] = useState(0)
  const [openId, setOpenId] = useState<number | null>(null) // control menu open

  const leadStatusOptions = [
    { label: t('pages.lead-list.status-active'), value: 'active' },
    { label: t('pages.lead-list.status-inactive'), value: 'inactive' },
  ]

  const handleDelete = async () => {
    formik.setFieldValue(
      'leadList',
      formik.values.leadList.filter((item) => item.value !== leadListId),
    )
  }

  const confirmDelete = (id: number) => {
    setLeadListId(id)
    setModal({ modalName: MODAL_NAMES.DELETE_CONFIRMATION, isOpen: true })
  }

  // update local list immediately so selectedOptions updates
  const handleOnChangeListStatus = async (id: number, value: TValue) => {
    const nextActive = value.value === 'active'
    setLeadListRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: nextActive } : r)),
    )
    try {
      await apiLeadList.updateLeadList(id, { active: nextActive })
    } catch (e) {
      // optional: revert on error
      setLeadListRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, active: !nextActive } : r)),
      )
      handleRestError({ e, dispatch })
    }
  }

  useEffect(() => {
    reFetch()
  }, [formik.values.leadList])

  const isViewModalOpen =
    modalState?.modalName === MODAL_NAMES.VIEW_LEAD_LIST && modalState.isOpen

  const headers: THeader<TLeadListRowKeys>[] = [
    {
      label: t('pages.lead-list.id'),
      value: ELeadsOrderBy.ID,
    },
    {
      label: t('pages.lead-list.name'),
      value: ELeadsOrderBy.NAME,
    },
    {
      label: t('pages.lead-list.active'),
      value: ELeadsOrderBy.ACTIVE,
    },
    { label: t('pages.lead-list.leadCount'), value: 'leadCount' },
    { label: t('pages.lead-list.lastCallDate'), value: 'lastCallDate' },
    { label: t('pages.lead-list.view'), value: 'view' },
    { label: t('pages.lead-list.remove'), value: 'delete' },
  ]

  const rows = leadListRows.map((leadList) => ({
    row: {
      id: leadList.id,
      name: <InfoColumn title={leadList.name} />,
      active: (
        <DropdownMenu
          // if your DropdownMenu supports this, also try: closeOnSelect
          // closeOnSelect
          open={openId === leadList.id}
          onOpenChange={(v) => setOpenId(v ? leadList.id : null)}
          maxHeight="350px"
          triggerElement={<TriggerChip active={leadList.active} />}
          selectedOptions={leadStatusOptions.filter(
            (option) => option.value === (leadList.active ? 'active' : 'inactive'),
          )}
          minWidth="210px"
          options={leadStatusOptions}
          multiple={false}
          onChange={(selectedEl: TValue[]) => {
            handleOnChangeListStatus(leadList.id, selectedEl[0])
            setOpenId(null) // explicitly close after select
          }}
        />
      ),
      leadCount: <InfoColumn title={leadList.leadCount} />,
      lastCallDate: (
        <InfoColumn
          title={
            leadList?.lastCallDate ? formatCreatedAt(leadList.lastCallDate, true) : ''
          }
        />
      ),
      view: (
        <IconButton onClick={() => handleView(leadList.id)} iconColor="main3">
          <EyeIcon width="24px" height="24px" />
        </IconButton>
      ),
      delete: (
        <ButtonWithTooltip
          showTooltip={isCampaignDisabledAction(
            leadList.campaignStatus as TCampaignActiveStatus,
          )}
          onClick={() => confirmDelete(leadList.id)}
          tooltipText={t(`pages.lead-list.remove-from-campaign-tooltip`)}
          iconType="info"
          buttonType="delete"
        />
      ),
    },
  }))

  return (
    <Flex direction="column" align="center" gap={12} margin="20px 0 0 0">
      <LeadListsSelect
        formik={formik}
        name="leadList"
        label={t('pages.lead-list.lead-selection')}
        campaignId={campaign.id}
      />
      <Table
        minHeight={isLoading ? undefined : '300px'}
        loading={isLoading}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
        emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
      />
      {isViewModalOpen && leadList && (
        <LeadListModal
          onClose={reFetch}
          leadListData={leadList}
          stats={leadListCallStatisticData}
        />
      )}
      <ConfirmDeleteModal
        title="Are you sure you want to remove this lead list from the campaign?"
        confirmAction={handleDelete}
      />
    </Flex>
  )
}
