import { FormikProps, FormikHelpers } from 'formik'

export type TFormik<T = any> = FormikProps<T>
export type TFormPropsAsync<T> = { formData: T; formik: FormikHelpers<T> }
export type TFormSubmit<T> = (d: TFormPropsAsync<T>) => void
