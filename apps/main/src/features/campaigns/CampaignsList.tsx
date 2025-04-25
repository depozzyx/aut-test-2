import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import { Flex } from '@/components/Flex'
import { IModal, useModals } from '@/features/common/modals/hooks/use-modals'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { CAMPAIGN_TABLE_TYPES, FILTER_TYPE } from '@/features/campaigns/constants'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { useCampaignsManager } from '@/features/campaigns/hooks/use-campaignsManager'
import { CampaignListTable } from '@/features/campaigns/containers/tables/CampaignListTable/CampaignListTable'
import { CampaignNameFilter } from '@/features/campaigns/containers/filters/CampaignNameFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { StatusFilter } from '@/features/campaigns/containers/filters/StatusFilter'
import { FeaturePermission } from '@/features/common/permissions/FeaturePermissions'
import { EManagerPermissions } from '@/constants/profile'
import { TValue } from '@/components/DropdownMenu/DropdownMenu'
import { useRedux } from '@/hooks/use-redux'
import { LimitSelect } from '@/components/limit-select'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { CampaignSearchField } from './components/CampaignSearchField'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/CampaignsList.styled'
import {
  asyncGetCampaignsList,
  setFilterCampaignIds,
  setPagination,
} from './store/campaigns'

const {
  CreateCampaignModal,
  DeleteCampaignModal,
  EditCampaignModal,
  NewCampaignReviewModal,
}: Record<string, IModal> = [
  'CreateCampaignModal',
  'DeleteCampaignModal',
  'EditCampaignModal',
  'NewCampaignReviewModal',
].reduce(
  (acc, modalName) => ({
    ...acc,
    [modalName]: dynamic(
      () => import(`./containers/modals/${modalName}`).then((mod) => mod[modalName]),
      { ssr: false },
    ),
  }),
  {},
)

export const CampaignsList = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState } = useModals()
  const { dispatch } = useRedux()

  const {
    handleCreateCampaign,
    handleChangePage,
    handleChangeDate,
    pagination: { page, total, limit },
    filters,
    handlerResetFilters,
  } = useCampaignsManager(asyncGetCampaignsList)

  const [selectedCampaignId, setSelectedCampaignId] = useState('')

  const createNew = () => {
    setSelectedCampaignId('')
    handleCreateCampaign()
  }

  const [campaignOptions, setCampaignOptions] = useState<TValue[]>([])

  const handleResetFilter = (id: number) =>
    filters?.filterCampaignIds &&
    dispatch(
      setFilterCampaignIds(filters.filterCampaignIds.filter((item) => item !== id)),
    )

  const handleChangeLimit = (option: SingleValue<TSelectOption>) =>
    option && dispatch(setPagination({ page, total, limit: +option.value }))

  return (
    <>
      <Container>
        <Panel>
          <Flex gap={16} align="center" width="100%">
            <CampaignSearchField placeholder={t('inputs:placeholder.search-campaign')} />
            <CampaignNameFilter
              type={CAMPAIGN_TABLE_TYPES.LIST}
              setCampaignOptions={setCampaignOptions}
            />
            <StatusFilter />
            <RangeDayPicker onChange={handleChangeDate} />
            <LimitSelect limit={limit} onChange={handleChangeLimit} />
          </Flex>
          <FeaturePermission permissions={[EManagerPermissions.CREATE_CAMPAIGN]}>
            <FilledButton
              size="m"
              maxWidth="236px"
              width="100%"
              startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
              onClick={createNew}
            >
              {t('add-campaign')}
            </FilledButton>
          </FeaturePermission>
        </Panel>
        <Flex
          gap={16}
          align="center"
          styles={{
            display: Object.keys(filters).length === 0 ? 'none' : 'flex',
            marginTop: '12px',
          }}
        >
          {(filters.filterCampaignIds ||
            filters.filterStatus ||
            (filters.filterDate?.from && filters.filterDate?.to)) && (
            <Flex gap="16px" align="center">
              {filters.filterCampaignIds &&
                filters.filterCampaignIds.map((id) => (
                  <PikedFilter key={id} onClose={() => handleResetFilter(id)}>
                    {campaignOptions.find((option) => option.value === id)?.label}
                  </PikedFilter>
                ))}
              {filters.filterStatus && (
                <PikedFilter onClose={() => handlerResetFilters(FILTER_TYPE.STATUS)}>
                  {t(`statuses.${filters.filterStatus}`)}
                </PikedFilter>
              )}
            </Flex>
          )}
          <OutlinedButton size="s" onClick={() => handlerResetFilters(FILTER_TYPE.ALL)}>
            {t('reset-filters')}
          </OutlinedButton>
        </Flex>
        <TableContainer>
          <CampaignListTable />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </PaginationContainer>
      </Container>
      {modalState?.modalName === MODAL_NAMES.EDIT_CAMPAIGN && modalState.isOpen && (
        <EditCampaignModal type={CAMPAIGN_TABLE_TYPES.LIST} />
      )}
      {modalState?.modalName === MODAL_NAMES.DELETE_CAMPAIGN && modalState.isOpen && (
        <DeleteCampaignModal type={CAMPAIGN_TABLE_TYPES.LIST} />
      )}
      {modalState?.modalName === MODAL_NAMES.CREATE_CAMPAIGN && modalState.isOpen && (
        <CreateCampaignModal
          selectedCampaignId={selectedCampaignId}
          setSelectedCampaignId={setSelectedCampaignId}
        />
      )}
      {modalState?.modalName === MODAL_NAMES.REVIEW_CAMPAIGN && modalState.isOpen && (
        <NewCampaignReviewModal type={CAMPAIGN_TABLE_TYPES.LIST} />
      )}
    </>
  )
}
