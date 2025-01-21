import { FC } from 'react'
import { TFormik } from '@peiko/types/formik'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'

type Props = {
  formik: TFormik
}

const limits = [10, 15, 25, 50, 100]

export const LimitSelect: FC<Props> = ({ formik }: Props) => (
  <FormikSelect
    formik={formik}
    name="limit"
    options={limits.map((l) => ({ label: l.toString(), value: l }))}
  />
)
