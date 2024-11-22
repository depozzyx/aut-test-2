import * as yup from 'yup'
import { validation } from '@/utils/validation'

export const createCampaignValidationSchema = yup.object().shape({
  name: validation.required,
  assignedAgentIds: yup
    .array()
    .of(yup.number())
    .min(1, 'This field must have at least 1 item')
    .default([]),
  reserveAgentIds: yup.array().of(yup.number()).default([]),
  leadListIds: yup
    .array()
    .of(yup.number())
    .min(1, 'This field must have at least 1 item')
    .default([]),
  holdTime: yup.number().min(5).required('This field is required'),
})
