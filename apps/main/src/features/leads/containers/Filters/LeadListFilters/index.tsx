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

type Props = {
  filters: TFormik
  onResetFilters: () => void
}

export const LeadListFilters: FC<Props> = ({ filters, onResetFilters }: Props) => {
  const { t } = useTranslation('leads-list')

  const campaignStatuses = [
    {
      label: 'Paused',
      value: 'pause',
    },
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Completed',
      value: 'complete',
    },
  ]

  const onChangeId = (v: string) => {
    if (Number.isInteger(+v)) {
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
        name="id"
        size="s"
        width="70px"
        placeholder={t('filters.placeholders.id')}
        debounce={600}
        onChange={onChangeId}
        value={filters.values.id}
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
        placeholder={t('filters.placeholders.name')}
        width="200px"
        size="s"
        debounce={600}
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
        name="campaignName"
        placeholder={t('filters.placeholders.campaignName')}
        width="200px"
        size="s"
        debounce={600}
        endAdornment={
          filters.values.campaignName && (
            <BaseIconButton onClick={() => filters.setFieldValue('campaignName', '')}>
              <CloseIcon />
            </BaseIconButton>
          )
        }
        endAdornmentStyles={{ paddingRight: '0 !important' }}
      />
      <FormikSelect
        formik={filters}
        name="campaignStatus"
        width="220px"
        placeholder={t('filters.placeholders.campaignStatus')}
        options={[
          ...(filters.values.campaignStatus ? [{ label: '-', value: '' }] : []),
          ...campaignStatuses,
        ]}
      />
      <LimitSelect formik={filters} />
      <BaseIconButton onClick={onResetFilters}>
        <CloseIcon color={filtersChanged() ? 'main4' : 'transparent'} size="ml" />
      </BaseIconButton>
    </Flex>
  )
}
