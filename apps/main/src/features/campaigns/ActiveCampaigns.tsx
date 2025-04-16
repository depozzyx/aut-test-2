import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { Flex } from '@/components/Flex'
import { DashboardTabs } from '@/components/DashboardTabs'
import { Pagination } from '@peiko/components/Pagination'
import { CAMPAIGN_TABLE_TYPES, FILTER_TYPE } from '@/features/campaigns/constants'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { useCampaignUpdates } from '@/features/campaigns/hooks/use-active-campaigns-update'
import { TValue } from '@/components/DropdownMenu/DropdownMenu'
import { useRedux } from '@/hooks/use-redux'
import { LimitSelect } from '@/components/limit-select'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { ActiveCampaignsTable } from './containers/tables/ActiveCampaignsTable'
import { CampaignNameFilter } from './containers/filters/CampaignNameFilter'
import { useCampaignsManager } from './hooks/use-campaignsManager'
import { CampaignSearchField } from './components/CampaignSearchField'
import {
  asyncGetActiveCampaigns,
  setFilterCampaignIds,
  setPagination,
} from './store/campaigns'

export const ActiveCampaigns = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { dispatch } = useRedux()

  useCampaignUpdates()

  const {
    handleChangePage,
    // handleChangeDate,
    pagination: { page, total, limit },
    filters,
    handlerResetFilters,
  } = useCampaignsManager(asyncGetActiveCampaigns, 5000)

  const [campaignOptions, setCampaignOptions] = useState<TValue[]>([])

  const handleResetFilter = (id: number) =>
    filters?.filterCampaignIds &&
    dispatch(
      setFilterCampaignIds(filters.filterCampaignIds.filter((item) => item !== id)),
    )

  const changeLimit = (option: SingleValue<TSelectOption>) =>
    option &&
    dispatch(
      setPagination({
        page,
        limit: +option.value,
        total,
      }),
    )
  return (
    <>
      <Flex direction="column" padding="12px 0 0 0">
        <DashboardTabs />
        <Flex padding="12px 0 0 0" justify="space-between">
          <Flex gap={16} align="center" width="100%" padding="0 16px 0 0">
            <CampaignSearchField placeholder={t('inputs:placeholder.search-campaign')} />
            <CampaignNameFilter
              type={CAMPAIGN_TABLE_TYPES.ACTIVE}
              setCampaignOptions={setCampaignOptions}
            />
            {/* <RangeDayPicker onChange={handleChangeDate} /> */}
            <LimitSelect limit={limit} onChange={changeLimit} />
          </Flex>
        </Flex>
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
            </Flex>
          )}
          <OutlinedButton size="s" onClick={() => handlerResetFilters(FILTER_TYPE.ALL)}>
            {t('reset-filters')}
          </OutlinedButton>
        </Flex>
        <ActiveCampaignsTable />
        <Flex padding="40px 0 0 0" justify="center">
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 15))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
    </>
  )
}
