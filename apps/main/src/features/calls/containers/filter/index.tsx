import { Flex } from '@/components/Flex'
import React, { FC, useCallback, useEffect } from 'react'

import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'

import { Select } from '@peiko/components/inputs/Select/Select'
import { endOfDay, startOfDay } from 'date-fns'
import { Input } from '@peiko/components/inputs/Input'
import { ERoles } from '@/constants/profile'
import { RangeDayPicker } from '@/components/inputs/RangeDayPicker'
import { SearchFieldIcon } from '@/components/icons/SearchFieldIcon'

import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { CDRListFilters, setCDRFilters } from '@/features/calls/store/calls'
import { dispositionOptions } from '@/types/calls'
import { useUserLoader } from '@/features/campaigns/hooks/useUserLoader'
import { useLeadListLoader } from '@/features/campaigns/hooks/useLeadListLoader'
import { useAgentGroupLoader } from '@/features/campaigns/hooks/useAgentGroupLoader'
import { useCampaignLoader } from '@/features/campaigns/hooks/useCampaignLoader'

type Props = {
  filters: CDRListFilters
  disabled?: boolean
}

export const CallsFilters: FC<Props> = ({ filters, disabled }: Props) => {
  const { t } = useTranslation('calls-list')
  const { select, dispatch } = useRedux()

  const {
    options: campaignOptions,
    loadMore: loadMoreCampaigns,
    setSearch: setCampaignSearch,
  } = useCampaignLoader([{ label: '-', value: 0 }])

  const {
    options: agentOptions,
    loadMore: agentLoadMore,
    setSearch: setAgentSearch,
  } = useUserLoader(ERoles.AGENT, [{ label: '-', value: 0 }], { showBlocked: true })

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

  const filtersChanged = (newValue: CDRListFilters) => {
    dispatch(setCDRFilters({ ...filters, ...newValue }))
  }

  const onResetFilters = () => {
    dispatch(setCDRFilters({}))
  }

  const onChangeSelectFilter = (
    value: number | string | boolean | undefined,
    field: keyof CDRListFilters,
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

  const filtersNotEmpty = () =>
    Object.values(filters).some((value) => value !== undefined && value !== '')

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  return (
    <Flex gap={10} width="100%">
      <RangeDayPicker
        dateValue={{
          from: filters.date?.from ? new Date(filters.date?.from) : undefined,
          to: filters.date?.to ? new Date(filters.date.to) : undefined,
        }}
        disabled={disabled}
        onChange={handleChangeDate}
      />
      <div style={{ flex: 1 }}>
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
      <div style={{ flex: 1 }}>
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
      <div style={{ flex: 1 }}>
        <Select
          value={filters.agentId}
          disabled={disabled}
          name="agentId"
          placeholder={t('filters.placeholders.agent')}
          options={agentOptions.filter((v) =>
            [undefined, 0].includes(filters.agentId) ? v.label !== '-' : true,
          )}
          onChange={(e) => onChangeSelectFilter(e?.value, 'agentId')}
          onMenuScrollToBottom={agentLoadMore}
          onInputChange={setAgentSearch}
          maxMenuHeight={200}
          width="100%"
          isSearchable
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
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
      <div style={{ flex: 1, minWidth: 0 }}>
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
      <div style={{ flex: 1 }}>
        <Input
          value={filters.phone || ''}
          disabled={disabled}
          name="phone"
          placeholder={t('filters.placeholders.phone')}
          size="s"
          debounce={600}
          onChange={(v) => onChangeSelectFilter(v, 'phone')}
          startAdornment={<SearchFieldIcon />}
          startAdornmentStyles={{ paddingRight: '0 !important' }}
          endAdornment={
            filters.phone ? (
              <BaseIconButton onClick={() => onChangeSelectFilter('', 'phone')}>
                <CloseIcon />
              </BaseIconButton>
            ) : undefined
          }
          endAdornmentStyles={{ paddingRight: '0 !important' }}
        />
      </div>

      <BaseIconButton disabled={!filtersNotEmpty()} onClick={onResetFilters}>
        <CloseIcon color={filtersNotEmpty() ? 'main4' : 'transparent'} size="ml" />
      </BaseIconButton>
    </Flex>
  )
}
