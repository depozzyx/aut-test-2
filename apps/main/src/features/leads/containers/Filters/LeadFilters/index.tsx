import { Flex } from '@/components/Flex'
import React, { FC } from 'react'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { TFormik } from '@peiko/types/formik'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { Input } from '@peiko/components/inputs/Input'
import { TSelectOption } from '@/components/MutliSelect/types'
import { SingleValue } from 'react-select'
import { LimitSelect } from '@/components/limit-select'
import { SearchFieldIcon } from '@/icons/SearchFieldIcon'
import { useCampaignLoader } from '@/features/campaigns/hooks/useCampaignLoader'
import { useLeadListLoader } from '@/features/campaigns/hooks/useLeadListLoader'

type Props = {
  filters: TFormik
  disabled?: boolean
  onResetFilters: () => void
}

export const LeadFilters: FC<Props> = ({ filters, onResetFilters, disabled }: Props) => {
  const { t } = useTranslation('leads-list')
  const { select } = useRedux()

  const {
    options: campaignOptions,
    loadMore: loadMoreCampaigns,
    setSearch: setCampaignSearch,
  } = useCampaignLoader([{ label: '-', value: 0 }])

  const {
    options: leadsListOptions,
    loadMore: loadMoreLeadsLists,
    setSearch: setLeadsListsSearch,
  } = useLeadListLoader([{ label: '-', value: 0 }])

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

  const onChangeFilter = (e: SingleValue<TSelectOption>, field: string) => {
    if (e) {
      if (e.value === 0) {
        filters.setFieldValue(field, '')
      } else {
        filters.setFieldValue(field, e?.value)
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        isSearchable
      />
      <FormikSelect
        formik={filters}
        disabled={disabled}
        name="campaignId"
        placeholder={t('leads.filters.placeholders.campaignName')}
        options={campaignOptions.filter((v) =>
          [undefined, '', '0'].includes(filters.values.campaignId)
            ? v.label !== '-'
            : true,
        )}
        onChange={(e) => onChangeFilter(e, 'campaignId')}
        onMenuScrollToBottom={loadMoreCampaigns}
        onInputChange={setCampaignSearch}
        maxMenuHeight={200}
        width="200px"
        isSearchable
      />
      <FormikSelect
        formik={filters}
        disabled={disabled}
        name="leadListId"
        placeholder={t('leads.filters.placeholders.leadList')}
        options={leadsListOptions.filter((v) =>
          [undefined, '', '0'].includes(filters.values.leadListId)
            ? v.label !== '-'
            : true,
        )}
        onChange={(e) => onChangeFilter(e, 'leadListId')}
        onMenuScrollToBottom={loadMoreLeadsLists}
        onInputChange={setLeadsListsSearch}
        maxMenuHeight={200}
        width="200px"
        isSearchable
      />
      <LimitSelect disabled={disabled} formik={filters} />
      <BaseIconButton disabled={!filtersChanged()} onClick={onResetFilters}>
        <CloseIcon color={filtersChanged() ? 'main4' : 'transparent'} size="ml" />
      </BaseIconButton>
    </Flex>
  )
}
