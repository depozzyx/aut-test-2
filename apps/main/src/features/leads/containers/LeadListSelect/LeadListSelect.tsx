import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import React, { FC, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { TSelectEvent, TSelectProps } from '@peiko/components/inputs/Select/types'
import { useLeadListLoader } from '@/features/campaigns/hooks/useLeadListLoader'
import {
  selectLeadsGroupOption,
  setLeadsGroup,
  setLeadsGroupOption,
} from '../../store/leads'

type LeadListSelectProps = Omit<TSelectProps, 'name' | 'onChange' | 'value'> & {
  withoutEmpty?: boolean
}

export const LeadListSelect: FC<LeadListSelectProps> = ({ withoutEmpty, ...props }) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('leads-list')

  const { leadsGroupOption } = select(
    createStructuredSelector({
      leadsGroupOption: selectLeadsGroupOption,
    }),
    shallowEqual,
  )

  const {
    options: leadListOptions,
    loadMore: loadMoreLeadLists,
    setSearch: setLeadListSearch,
    reload: reloadOptions,
  } = useLeadListLoader(withoutEmpty ? [] : [{ label: '-', value: 0 }])

  const onSelect = (data: TSelectEvent) => {
    if (data) {
      dispatch(setLeadsGroup(+(data.value ?? 0)))
      dispatch(setLeadsGroupOption(data))
    }
  }

  useEffect(() => {
    reloadOptions()
  }, [leadsGroupOption])

  return (
    <Select
      name="leads-group"
      options={leadListOptions}
      value={leadsGroupOption}
      onChange={onSelect}
      onMenuScrollToBottom={loadMoreLeadLists}
      onInputChange={setLeadListSearch}
      placeholder={t('headers.select')}
      {...props}
      isSearchable
      emitValues={false}
    />
  )
}
