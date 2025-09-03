import { Flex } from '@/components/Flex'
import React, { FC } from 'react'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { TFormik } from '@peiko/types/formik'
import useTranslation from 'next-translate/useTranslation'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { Input } from '@peiko/components/inputs/Input'
import { LimitSelect } from '@/components/limit-select'
import { SearchFieldIcon } from '@/icons/SearchFieldIcon'
import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'

type Props = {
  filters: TFormik
  disabled?: boolean
  onResetFilters: () => void
}

export const LeadListFilters: FC<Props> = ({
  filters,
  onResetFilters,
  disabled,
}: Props) => {
  const { t } = useTranslation('leads-list')

  const campaignStatuses = Object.keys(CAMPAIGN_STATUSES).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: CAMPAIGN_STATUSES[key as keyof typeof CAMPAIGN_STATUSES],
  }))

  const { campaignOptions, loadMoreCampaigns } = useCampaignNameFilter('list', true)

  const onChangeId = (v: string) => {
    if (Number.isInteger(+v) && v.length < 11) {
      filters.setFieldValue('id', v)
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
        placeholder={t('filters.placeholders.id')}
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
        placeholder={t('filters.placeholders.name')}
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
      <FormikSelect
        formik={filters}
        disabled={disabled}
        name="campaignId"
        placeholder={t('filters.placeholders.campaignName')}
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
        disabled={disabled}
        name="campaignStatus"
        width="220px"
        placeholder={t('filters.placeholders.campaignStatus')}
        options={[
          ...(filters.values.campaignStatus ? [{ label: '-', value: '' }] : []),
          ...campaignStatuses,
        ]}
      />
      <LimitSelect disabled={disabled} formik={filters} />
      <BaseIconButton onClick={onResetFilters}>
        <CloseIcon color={filtersChanged() ? 'main4' : 'transparent'} size="ml" />
      </BaseIconButton>
    </Flex>
  )
}
