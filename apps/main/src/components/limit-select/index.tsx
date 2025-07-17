import { FC } from 'react'
import { TFormik } from '@peiko/types/formik'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'
import { TSelectOption } from '@/components/MutliSelect/types'
import { SingleValue } from 'react-select'
import { Select } from '@peiko/components/inputs/Select/Select'

type Props = {
  formik?: TFormik
  limit?: number
  onChange?: (option: SingleValue<TSelectOption>) => void
}

const limits = [10, 15, 25, 50, 100]
const options = limits.map((l) => ({ label: l.toString(), value: l }))

export const LimitSelect: FC<Props> = ({ formik, limit, onChange }: Props) =>
  formik ? (
    <FormikSelect
      formik={formik}
      styles={{ minWidth: '90px' }}
      name="limit"
      options={options}
    />
  ) : (
    <Select
      name="limit"
      styles={{ minWidth: '90px' }}
      options={options}
      onChange={onChange}
      value={limit}
    />
  )
