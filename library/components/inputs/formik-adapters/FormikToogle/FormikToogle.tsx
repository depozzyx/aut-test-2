import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { TToogleProps } from '../../Toogle/types'
import { Toogle } from '../../Toogle'

type TProps = {
  formik: TFormik
} & TToogleProps

export const FormikToogle: React.FC<TProps> = ({ formik, onChange, ...props }) => {
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

  return <Toogle {...props} {...field} onChange={handleChange} error={fieldError} />
}
