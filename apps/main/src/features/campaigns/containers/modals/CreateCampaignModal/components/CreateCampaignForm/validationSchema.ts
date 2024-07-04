import * as yup from 'yup'
import { validation } from '@/utils/validation'

export const createCampaignValidationSchema = yup.object().shape({
  name: validation.required,
  assignedAgentIds: yup.array().of(yup.number()).default([]),
  reserveAgentIds: yup.array().of(yup.number()).default([]),
  leadListIds: yup.array().of(yup.number()).default([]),
})
