import * as yup from 'yup'
import { CLOUDFLARE_CAPTCHA_SITE_KEY } from '@/constants/config'

export const string = yup.string()

export const number = yup.number()

export const boolean = yup.boolean()

export const required = yup.string().required('validation:required')

export const emailValidation = yup
  .string()
  .email('validation:invalid-email')
  .min(5, 'Minimum 5 characters required')
  .max(60, 'Maximum 60 characters allowed')
  .required('This field is required')

export const passwordValidation = yup
  .string()
  .nullable()
  .test(
    'password-strength',
    'Password must be at least 8 characters long, include numbers, uppercase and lowercase letters, and have no spaces',
    (value) => !value || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,32}$/.test(value),
  )

export const repeatPasswordValidation = yup
  .string()
  .oneOf([yup.ref('password'), yup.ref('newPassword'), null], 'validation:password-match')
  .required('validation:required')

export const singleCheckbox = yup
  .boolean()
  .isTrue('validation:required')
  .required('validation:required')

export const requiredNumber = yup.number().required('validation:required')

// export const requiredStringOrNumber = yup
//   .mixed()
//   .test(
//     'is-string-or-number',
//     'validation:required',
//     (value) =>
//       (typeof value === 'string' && value.trim() !== '') ||
//       (typeof value === 'number' && !Number.isNaN(value)),
//   )
//   .required('validation:required')

export const editLeadValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .matches(/^[A-Za-z ]+$/, 'Only letters are allowed')
    .min(5, 'Minimum 5 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .required('This field is required'),
})

export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

export const recycleRuleSchema = yup.object().shape({
  status: yup.string().required('Field is required'),
  delay: yup
    .string()
    .matches(timeRegex, 'At least 00:15')
    .test('min-time', 'At least 00:15', (value) => {
      if (!value) return false
      const [hours, minutes] = value.split(':').map(Number)
      return hours > 0 || minutes >= 15
    })
    .required('Field is required'),
  attempts: yup.number().min(1, 'Minimum 1').max(10, 'Maximum 10').required('At least 1'),
})

export const recycleRulesSchema = yup.array().of(recycleRuleSchema).default([])

export const createCampaignValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .min(5, 'Minimum 5 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .matches(/^[A-Za-z0-9 \-_.!]+$/, 'Only letters, numbers, space, and -_.! are allowed')
    .required('This field is required'),
  assignedAgentIds: yup
    .array()
    .of(yup.number())
    .min(1, 'This field must have at least 1 item')
    .default([]),
  reserveAgentIds: yup.array().of(yup.number()).default([]),
  leadListIds: yup.array().of(yup.number()).default([]),
  holdTime: yup
    .number()
    .min(1, 'Minimum 1s')
    .max(60, 'Maximum 60 seconds')
    .default(0)
    .required('This field is required'),
  mode: yup.string().required('This field is required'),
  coefficient: yup.string().required('This field is required'),
  workHours: yup.string().required('This field is required'),
  filterLeadStatuses: yup
    .array()
    .of(yup.string())
    .min(1, 'This field must have at least 1 item')
    .default([]),
  // recycleRules: recycleRulesSchema,
})

export const createLeadListValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .min(5, 'Minimum 5 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .matches(/^[A-Za-z0-9 \-_]+$/, 'Only letters, numbers, space, and -_ are allowed')
    .required('This field is required'),
})

export const createAgentValidationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .min(5, 'Minimum 5 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .matches(/^[A-Za-z0-9 ]+$/, 'Only letters, numbers, and space are allowed')
    .required('This field is required'),
  email: emailValidation,
  sendToEmail: boolean,
  password: passwordValidation,
})

export const editAgentValidationSchema = createAgentValidationSchema.omit([
  'sendToEmail',
  'password',
])

export const createManagerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .min(2, 'Minimum 2 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .matches(/^[A-Za-z0-9 ]+$/, 'Only letters, numbers, and space are allowed')
    .required('This field is required'),
  email: emailValidation,
  password: passwordValidation,
})

export const accountManagementValidationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .test(
      'no-only-spaces',
      'Cannot contain only spaces',
      (value) => value === undefined || value === null || value.trim().length > 0,
    )
    .min(2, 'Minimum 2 characters required')
    .max(30, 'Maximum 30 characters allowed')
    .matches(/^[A-Za-z0-9 ]+$/, 'Only letters, numbers, and space are allowed')
    .required('This field is required'),
})

const captchaTokenValidation = CLOUDFLARE_CAPTCHA_SITE_KEY
  ? yup.string().required('This field is required')
  : yup.string()

export const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  captchaToken: captchaTokenValidation,
})

export const resetPasswordValidationSchema = yup.object().shape({
  password: passwordValidation,
  confirmPassword: repeatPasswordValidation,
})

export const forgotPasswordValidationSchema = yup.object().shape({
  email: emailValidation,
  captchaToken: captchaTokenValidation,
})

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: passwordValidation,
  password: passwordValidation,
  confirmPassword: repeatPasswordValidation,
})
