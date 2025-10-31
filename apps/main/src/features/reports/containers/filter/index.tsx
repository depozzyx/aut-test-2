import { Flex } from '@/components/Flex'
import React, { FC, useCallback, useEffect, useMemo } from 'react'

import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'

import { Select } from '@peiko/components/inputs/Select/Select'
import { endOfDay, startOfDay } from 'date-fns'
import { useUserLoader } from '@/features/campaigns/hooks/useUserLoader'
import { useLeadListLoader } from '@/features/campaigns/hooks/useLeadListLoader'
import { useAgentGroupLoader } from '@/features/campaigns/hooks/useAgentGroupLoader'
import { useCampaignLoader } from '@/features/campaigns/hooks/useCampaignLoader'
import { RangeDayPicker } from '@/components/inputs/RangeDayPicker'

import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { ERoles } from '@/constants/profile'
import { dispositionOptions } from '@/types/calls'
import {
  ReportsFilters,
  setCampaignStatisticsFilters,
} from '@/features/reports/store/reports'

type Props = {
  filters: ReportsFilters
  disabled?: boolean
  inactiveFilters?: InactiveFilters
}

type InactiveFilters = {
  [key in keyof ReportsFilters]: boolean
}

export const CampaignStatisticsFilters: FC<Props> = ({
  filters,
  disabled,
  inactiveFilters = {},
}: Props) => {
  const { t } = useTranslation('campaign-statistics')
  const { select, dispatch } = useRedux()

  const {
    options: userOptions,
    loadMore: loadMoreUsers,
    setSearch: setUserSearch,
  } = useUserLoader(ERoles.AGENT, [{ label: '-', value: 0 }], { showBlocked: true })

  const {
    options: campaignOptions,
    loadMore: loadMoreCampaigns,
    setSearch: setCampaignSearch,
  } = useCampaignLoader([{ label: '-', value: 0 }])

  const {
    options: leadListOptions,
    loadMore: loadMoreLeadLists,
    setSearch: setLeadListSearch,
  } = useLeadListLoader([{ label: '-', value: 0 }])

  const {
    options: agentGroupOptions,
    loadMore: loadMoreAgentGroup,
    setSearch: setAgentGroupSearch,
  } = useAgentGroupLoader([{ label: '-', value: 0 }])

  const statuses = select(selectLeadStatuses)

  const filtersChanged = (newValue: ReportsFilters) => {
    dispatch(setCampaignStatisticsFilters({ ...filters, ...newValue }))
  }

  const onResetFilters = () => {
    dispatch(
      setCampaignStatisticsFilters({
        onlyActive: filters?.onlyActive || false,
      }),
    )
  }

  const onChangeSelectFilter = (
    value: number | string | boolean | undefined,
    field: keyof ReportsFilters,
  ) => {
    filtersChanged({ [field]: value || undefined })
  }

  const handleChangeDate = useCallback((date) => {
    const newDate = {
      from: date?.from ? startOfDay(date.from).valueOf() : undefined,
      to: date?.to ? endOfDay(date.to).valueOf() : undefined,
    }
    filtersChanged({ date: date?.from || date?.to ? newDate : undefined })
  }, [])

  const filtersNotEmpty = useMemo(
    () =>
      Object.entries(filters).some(
        ([key, value]) =>
          !inactiveFilters?.[key as keyof ReportsFilters] &&
          value !== undefined &&
          value !== '',
      ),
    [filters, inactiveFilters],
  )

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  return (
    <Flex gap={10} width="100%">
      {!inactiveFilters?.date && (
        <RangeDayPicker
          dateValue={{
            from: filters.date?.from ? new Date(filters.date?.from) : undefined,
            to: filters.date?.to ? new Date(filters.date.to) : undefined,
          }}
          disabled={disabled}
          onChange={handleChangeDate}
        />
      )}
      {!inactiveFilters?.campaignId && (
        <div style={{ flex: 1, minWidth: 0, maxWidth: 300 }}>
          <Select
            value={filters.campaignId}
            disabled={disabled}
            name="campaignId"
            placeholder={t('filters.placeholders.campaignName')}
            options={campaignOptions.filter((v) =>
              [undefined, 0].includes(filters.campaignId) ? v.label !== '-' : true,
            )}
            onMenuScrollToBottom={loadMoreCampaigns}
            onChange={(e) => onChangeSelectFilter(e?.value, 'campaignId')}
            onInputChange={setCampaignSearch}
            maxMenuHeight={200}
            width="100%"
            isSearchable
          />
        </div>
      )}
      {!inactiveFilters?.leadListId && (
        <div style={{ flex: 1, minWidth: 0, maxWidth: 300 }}>
          <Select
            value={filters.leadListId}
            disabled={disabled}
            name="leadListId"
            placeholder={t('filters.placeholders.leadList')}
            options={leadListOptions.filter((v) =>
              [undefined, 0].includes(filters.leadListId) ? v.label !== '-' : true,
            )}
            onChange={(e) => onChangeSelectFilter(e?.value, 'leadListId')}
            onMenuScrollToBottom={loadMoreLeadLists}
            onInputChange={setLeadListSearch}
            maxMenuHeight={200}
            width="100%"
            isSearchable
          />
        </div>
      )}
      {!inactiveFilters?.agentId && (
        <div style={{ flex: 1 }}>
          <Select
            value={filters.agentGroupId}
            disabled={disabled}
            name="agentGroupId"
            placeholder={t('filters.placeholders.agent-group')}
            options={agentGroupOptions.filter((v) =>
              [undefined, 0].includes(filters.agentGroupId) ? v.label !== '-' : true,
            )}
            onChange={(e) => onChangeSelectFilter(e?.value, 'agentGroupId')}
            onMenuScrollToBottom={loadMoreAgentGroup}
            onInputChange={setAgentGroupSearch}
            maxMenuHeight={200}
            width="100%"
            isSearchable
          />
        </div>
      )}
      {!inactiveFilters?.agentId && (
        <div style={{ flex: 1, minWidth: 0, maxWidth: 300 }}>
          <Select
            value={filters.agentId}
            disabled={disabled}
            name="agentId"
            placeholder={t('filters.placeholders.agent')}
            options={userOptions.filter((v) =>
              [undefined, 0].includes(filters.agentId) ? v.label !== '-' : true,
            )}
            onChange={(e) => onChangeSelectFilter(e?.value, 'agentId')}
            onInputChange={setUserSearch}
            onMenuScrollToBottom={loadMoreUsers}
            maxMenuHeight={200}
            width="100%"
            isSearchable
          />
        </div>
      )}
      {!inactiveFilters?.disposition && (
        <div style={{ flex: 1, minWidth: 0, maxWidth: 300 }}>
          <Select
            value={filters.disposition}
            disabled={disabled}
            name="disposition"
            placeholder={t('filters.placeholders.disposition')}
            options={[
              ...(filters.disposition ? [{ label: '-', value: '' }] : []),
              ...dispositionOptions,
            ]}
            width="100%"
            onChange={(e) => onChangeSelectFilter(e?.value, 'disposition')}
          />
        </div>
      )}
      {!inactiveFilters?.status && (
        <div style={{ flex: 1, minWidth: 0, maxWidth: 300 }}>
          <Select
            value={filters.status}
            disabled={disabled}
            name="status"
            placeholder={t('filters.placeholders.status')}
            options={[
              ...(filters.status ? [{ label: '-', value: '' }] : []),
              ...statuses.map(({ name: label, value }) => ({
                label,
                value: value.toString(),
              })),
            ]}
            width="100%"
            onChange={(e) => onChangeSelectFilter(e?.value, 'status')}
            isSearchable
          />
        </div>
      )}
      <BaseIconButton disabled={!filtersNotEmpty} onClick={onResetFilters}>
        <CloseIcon color={filtersNotEmpty ? 'main4' : 'transparent'} size="ml" />
      </BaseIconButton>
    </Flex>
  )
}
