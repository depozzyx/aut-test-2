import { Flex } from '@/components/Flex'
import React, { FC, useCallback, useEffect } from 'react'

import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'

import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'
import { Select } from '@peiko/components/inputs/Select/Select'
import { endOfDay, startOfDay } from 'date-fns'
import { Input } from '@peiko/components/inputs/Input'
import { RangeDayPicker } from '../../../../components/inputs/RangeDayPicker'
import { CDRListFilters, setCDRFilters } from '../../store/calls'

import { getLeadStatuses, selectLeadStatuses } from '../../../leads/store/leads'
import { useLeadListFilter } from '../../../campaigns/hooks/use-leadListFilter'
import { useUserFilter } from '../../../campaigns/hooks/use-userFilter'
import { ERoles } from '../../../../constants/profile'
import { SearchFieldIcon } from '../../../../components/icons/SearchFieldIcon'

type Props = {
  filters: CDRListFilters
  disabled?: boolean
}

const dispositions = [
  { label: 'Answered', value: 'answered' },
  { label: 'Unanswered', value: 'no_answer' },
  // { label: 'Failed', value: 'failed' },
  // { label: 'Busy', value: 'busy' },
]

export const CallsFilters: FC<Props> = ({ filters, disabled }: Props) => {
  const { t } = useTranslation('calls-list')
  const { select, dispatch } = useRedux()

  const { campaignOptions, loadMoreCampaigns } = useCampaignNameFilter('list', true)
  const { options: leadListOptions, loadMoreLeadLists } = useLeadListFilter()
  const { options: userOptions, loadMoreUsers } = useUserFilter(ERoles.AGENT)

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
    filtersChanged({ date: newDate })
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
          maxMenuHeight={200}
          width="100%"
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
          maxMenuHeight={200}
          width="100%"
        />
      </div>
      <div style={{ flex: 1 }}>
        <Select
          value={filters.agentId}
          disabled={disabled}
          name="agentId"
          placeholder={t('filters.placeholders.agent')}
          options={userOptions.filter((v) =>
            [undefined, 0].includes(filters.agentId) ? v.label !== '-' : true,
          )}
          onChange={(e) => onChangeSelectFilter(e?.value, 'agentId')}
          onMenuScrollToBottom={loadMoreUsers}
          maxMenuHeight={200}
          width="100%"
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
            ...dispositions,
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
