import { Flex } from '@/components/Flex'
import React, { FC } from 'react'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { TFormik } from '@peiko/types/formik'
import {
  getLeadsGroups,
  getLeadStatuses,
  selectLeadsGroup,
  selectLeadsGroupError,
  selectLeadsGroupPagination,
  selectLeadsGroups,
  selectLeadStatuses,
} from '@/features/leads/store/leads'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { Input } from '@peiko/components/inputs/Input'
import { TSelectOption } from '@/components/MutliSelect/types'
import { SingleValue } from 'react-select'
import { LimitSelect } from '@/components/limit-select'
import { SearchFieldIcon } from '@/icons/SearchFieldIcon'
import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'

type Props = {
  filters: TFormik
  onResetFilters: () => void
}

export const LeadFilters: FC<Props> = ({ filters, onResetFilters }: Props) => {
  const { t } = useTranslation('leads-list')
  const { select, dispatch } = useRedux()

  const {
    leadsGroup,
    leadsGroups,
    error,
    pagination: { page, limit: leadListLimit, total },
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
    const lastPage = total === 0 ? 1 : Math.ceil(total / (leadListLimit ?? 15))
    if (page < lastPage)
      dispatch(getLeadsGroups({ page: page + 1, limit: leadListLimit, orderBy: 'DESC' }))
  }

  const { campaignOptions, loadMoreCampaigns } = useCampaignNameFilter('list', true)

  getLeadStatuses()
  const statuses = select(selectLeadStatuses)

  const onChangeId = (v: string) => {
    if (Number.isInteger(+v) && v.length < 11) {
      filters.setFieldValue('id', v)
    }
  }

  const allowedPhoneSymbols = ['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const onChangePhone = (v: string) => {
    const filteredValue = v
      .split('')
      .filter((symbol) => allowedPhoneSymbols.includes(symbol))
      .join('')
    filters.setFieldValue('phone', filteredValue)
  }

  const onChangeLeadList = (e: SingleValue<TSelectOption>) => {
    if (e) {
      if (e.value === '0') {
        filters.setFieldValue('leadListId', '')
      } else {
        filters.setFieldValue('leadListId', e?.value)
      }
    }
  }

  const filtersChanged = () => {
    if (!filters.dirty) {
      return filters.dirty
    }
    return Object.keys(filters.initialValues).some(
      (key) => filters.values[key] && filters.initialValues[key] !== filters.values[key],
    )
  }

  return (
    <Flex gap={10} align="center">
      <Input
        type="number"
        name="id"
        size="s"
        width="120px"
        placeholder={t('leads.filters.placeholders.id')}
        debounce={600}
        onChange={onChangeId}
        value={filters.values.id}
        startAdornment={<SearchFieldIcon />}
        startAdornmentStyles={{ paddingRight: '0 !important' }}
        endAdornment={
          filters.values.id && (
            <BaseIconButton onClick={() => filters.setFieldValue('id', '')}>
              <CloseIcon />
            </BaseIconButton>
          )
        }
        endAdornmentStyles={{ paddingRight: '0 !important' }}
      />
      <FormikInput
        formik={filters}
        name="name"
        placeholder={t('leads.filters.placeholders.name')}
        width="200px"
        size="s"
        debounce={600}
        startAdornment={<SearchFieldIcon />}
        startAdornmentStyles={{ paddingRight: '0 !important' }}
        endAdornment={
          filters.values.name && (
            <BaseIconButton onClick={() => filters.setFieldValue('name', '')}>
              <CloseIcon size="m" />
            </BaseIconButton>
          )
        }
        endAdornmentStyles={{ paddingRight: '0 !important' }}
      />
      <FormikInput
        formik={filters}
        name="phone"
        placeholder={t('leads.filters.placeholders.phone')}
        width="200px"
        size="s"
        debounce={600}
        onChange={onChangePhone}
        startAdornment={<SearchFieldIcon />}
        startAdornmentStyles={{ paddingRight: '0 !important' }}
        endAdornment={
          filters.values.phone && (
            <BaseIconButton onClick={() => filters.setFieldValue('phone', '')}>
              <CloseIcon />
            </BaseIconButton>
          )
        }
        endAdornmentStyles={{ paddingRight: '0 !important' }}
      />
      <FormikSelect
        formik={filters}
        name="status"
        width="200px"
        placeholder={t('leads.filters.placeholders.status')}
        options={[
          ...(filters.values.status ? [{ label: '-', value: '' }] : []),
          ...statuses.map(({ name: label, value }) => ({
            label,
            value: value.toString(),
          })),
        ]}
      />
      <FormikSelect
        formik={filters}
        name="campaignId"
        placeholder={t('leads.filters.placeholders.campaignName')}
        options={campaignOptions.filter((v) =>
          [undefined, '', '0'].includes(filters.values.campaignId)
            ? v.label !== '-'
            : true,
        )}
        onMenuScrollToBottom={loadMoreCampaigns}
        maxMenuHeight={200}
        width="200px"
      />
      <FormikSelect
        formik={filters}
        name="leadListId"
        placeholder={t('leads.filters.placeholders.leadList')}
        options={leadsGroups
          .map(({ id, name }) => ({
            label: name,
            value: id.toString(),
          }))
          .filter((v) =>
            [undefined, '', '0'].includes(filters.values.leadListId)
              ? v.label !== '-'
              : true,
          )}
        onChange={onChangeLeadList}
        onMenuScrollToBottom={onMenuScrollToBottom}
        value={leadsGroup !== undefined ? leadsGroup.toString() : ''}
        error={error}
        maxMenuHeight={200}
        width="200px"
      />
      <LimitSelect formik={filters} />
      <BaseIconButton onClick={onResetFilters}>
        <CloseIcon color={filtersChanged() ? 'main4' : 'transparent'} size="ml" />
      </BaseIconButton>
    </Flex>
  )
}
