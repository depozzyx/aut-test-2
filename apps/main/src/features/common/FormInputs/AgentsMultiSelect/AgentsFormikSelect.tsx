import React, { useCallback } from 'react'

import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'

import { FormikProps } from 'formik'

import { TSelectEvent } from '../../../../components/MutliSelect/types'
import { ERoles } from '../../../../constants/profile'
import { useUserLoader } from '../../../campaigns/hooks/useUserLoader'

type AgentsSelectProps<FormValues> = {
  formik: FormikProps<FormValues>
  name?: keyof FormValues & string
  label?: string
  disabled?: boolean
  isMulti?: boolean
  onChange?: (value: TSelectEvent) => void
}

export function AgentsFormikSelect<FormValues extends Record<string, any>>({
  formik,
  name = 'assignedAgent',
  label,
  disabled,
  isMulti = true,
  onChange,
}: AgentsSelectProps<FormValues>): JSX.Element {
  const { options, loadMore, setSearch } = useUserLoader(ERoles.AGENT)

  const handleChange = useCallback(
    (p: TSelectEvent) => {
      if (onChange) onChange(p)
    },
    [formik, name],
  )

  return (
    <FormikMultiSelect
      formik={formik}
      name={name}
      label={label ? { label } : undefined}
      isSearchable
      width="100%"
      disabled={disabled}
      options={options}
      onInputChange={(value) => setSearch(value)}
      onMenuScrollToBottom={loadMore}
      isMulti={isMulti}
      onChange={handleChange}
    />
  )
}
