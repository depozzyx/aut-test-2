import * as yup from 'yup'
import { validation } from '@/utils/validation'

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

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
  name: validation.required,
  assignedAgentIds: yup
    .array()
    .of(yup.number())
    .min(1, 'This field must have at least 1 item')
    .default([]),
  reserveAgentIds: yup.array().of(yup.number()).default([]),
  leadListIds: yup.array().of(yup.number()).default([]),
  holdTime: yup.number().min(5).max(60).required('This field is required'),
  mode: yup.string().required('This field is required'),
  coefficient: yup.string().required('This field is required'),
  workHours: yup.string().required('This field is required'),
  filterLeadStatuses: yup.array().of(yup.string()).default([]),
  recycleRules: recycleRulesSchema,
})
