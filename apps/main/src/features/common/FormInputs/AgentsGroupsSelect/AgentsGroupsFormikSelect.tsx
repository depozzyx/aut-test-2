import React, { useCallback } from 'react'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'

import { FormikProps } from 'formik'

import { useAgentGroupLoader } from '../../../campaigns/hooks/useAgentGroupLoader'

type AgentsGroupsSelectProps<FormValues> = {
  formik: FormikProps<FormValues>
  name: keyof FormValues & string
  label?: string
  disabled?: boolean
  isMulti?: boolean
}

export function AgentsGroupsSelect<FormValues extends Record<string, any>>({
  formik,
  name,
  label,
  disabled,
  isMulti = true,
}: AgentsGroupsSelectProps<FormValues>): JSX.Element {
  const { options, loadMore, setSearch } = useAgentGroupLoader()

  // Mark field touched after change to trigger validation
  const handleChange = useCallback(() => {
    setTimeout(() => {
      formik.setTouched({ ...(formik.touched as any), [name]: true }, true)
    }, 0)
  }, [formik, name])

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
      onChange={handleChange}
      isMulti={isMulti}
    />
  )
}
