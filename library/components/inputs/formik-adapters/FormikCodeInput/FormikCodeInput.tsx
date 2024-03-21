import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { TCodeInputProps } from '../../CodeInput/types'
import { CodeInput } from '../../CodeInput'

type TProps = {
  formik: TFormik
} & TCodeInputProps

export const FormikCodeInput: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (value: string) => {
    formik.setFieldValue(field.name, value)

    if (onChange) {
      onChange(value)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return <CodeInput {...props} {...field} onChange={handleChange} error={fieldError} />
}
