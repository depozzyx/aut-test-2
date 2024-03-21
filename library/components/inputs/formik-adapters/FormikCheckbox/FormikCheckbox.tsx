import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { Checkbox } from '../../checkboxes/Checkbox'
import { TCheckBoxProps, TCheckboxEvent } from '../../checkboxes/Checkbox/types'

type TProps = {
  formik: TFormik
} & TCheckBoxProps

export const FormikCheckbox: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (e: TCheckboxEvent) => {
    formik.setFieldValue(field.name, e.value)

    if (onChange) {
      onChange(e)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return <Checkbox {...props} {...field} onChange={handleChange} error={fieldError} />
}
