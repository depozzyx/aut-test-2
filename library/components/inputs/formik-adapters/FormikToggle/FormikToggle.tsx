import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { TToggleProps } from '../../Toggle/types'
import { Toggle } from '../../Toggle'

type TProps = {
  formik: TFormik
} & TToggleProps

export const FormikToggle: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (checked: boolean) => {
    formik.setFieldValue(field.name, checked)

    if (onChange) {
      onChange(checked)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return <Toggle {...props} {...field} onChange={handleChange} error={fieldError} />
}
