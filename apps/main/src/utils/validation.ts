import * as yup from 'yup'

const string = yup.string()

const number = yup.number()

const boolean = yup.boolean()

const required = yup.string().required('validation:required')

const email = yup.string().email('validation:invalid-email')

const password = yup.string().required('validation:required')

const repeatPassword = yup
  .string()
  .oneOf([yup.ref('password'), yup.ref('newPassword'), null], 'validation:password-match')
  .required('validation:required')

const singleCheckbox = yup
  .boolean()
  .isTrue('validation:required')
  .required('validation:required')

export const validation = {
  string,
  number,
  boolean,
  required,
  email,
  password,
  repeatPassword,
  singleCheckbox,
}
