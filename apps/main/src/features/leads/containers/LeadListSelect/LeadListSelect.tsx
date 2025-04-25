import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import React, { FC } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { TSelectProps } from '@peiko/components/inputs/Select/types'
import {
  getLeadsGroups,
  selectLeadsGroup,
  selectLeadsGroupError,
  selectLeadsGroupPagination,
  selectLeadsGroups,
  setLeadsGroup,
} from '../../store/leads'

type LeadListSelectProps = Omit<TSelectProps, 'name' | 'onChange' | 'value'> & {
  withoutEmpty?: boolean
}

export const LeadListSelect: FC<LeadListSelectProps> = ({ withoutEmpty, ...props }) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('leads-list')

  const {
    leadsGroup,
    leadsGroups,
    error,
    pagination: { page, limit, total },
  } = select(
    createStructuredSelector({
      leadsGroup: selectLeadsGroup,
      leadsGroups: selectLeadsGroups,
      error: selectLeadsGroupError,
      pagination: selectLeadsGroupPagination,
    }),
    shallowEqual,
  )

  const onMenuScrollToBottom = () => {
    const lastPage = total === 0 ? 1 : Math.ceil(total / (limit ?? 10))
    if (page < lastPage) dispatch(getLeadsGroups({ page: page + 1, limit }))
  }

  return (
    <Select
      name="leads-group"
      options={leadsGroups
        .map(({ id, name }) => ({ label: name, value: id.toString() }))
        .filter((item) => (withoutEmpty ? item.label !== '-' : true))}
      value={leadsGroup !== undefined ? leadsGroup.toString() : ''}
      error={error}
      onChange={(data) => {
        if (data) dispatch(setLeadsGroup(+data.value))
      }}
      onMenuScrollToBottom={onMenuScrollToBottom}
      placeholder={t('headers.select')}
      {...props}
    />
  )
}
