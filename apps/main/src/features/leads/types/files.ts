import { TUnknownStatuses } from '../../../api/rest/leads/types'

export type TImportProgress = {
  id: string
  importProgress: number
}

export type TValidationErrors = {
  target: {
    LeadName: string
    LeadPhone: string
    LeadTimezone: string
    LeadStatus: string
    Source: string
  }
  value: string
  property: string
  children: []
  constraints: {
    [key in string]: string
  }
}

export type DuplicatedPhoneNumbers = {
  phoneNumber: string
  existInDatabase: boolean
  filesIds: string[]
  count: number
}

export type TImportError = {
  validationErrors?: TValidationErrors[]
  duplicatedPhoneNumbers?: DuplicatedPhoneNumbers[]
  unknownStatuses?: string[]
}

export type TImportErrorRes = {
  statusCode: number
  data: TImportError
}

export type TPreparedFiles = {
  name: string
  size: number
  type: string
  data: string | ArrayBuffer | null
  id: string
  duplicate?: boolean
  startImporting?: boolean
  imported?: boolean
  error?: string[]
  validationErrors?: TValidationErrors[]
  duplicatedPhoneNumbers?: DuplicatedPhoneNumbers[]
  duplicatedPhoneNotFixed?: boolean
  unknownStatuses?: TUnknownStatuses[]
  unknownStatusesNotFixed?: boolean
  canceled?: boolean

  importProgress?: number
  uploadProgress?: number
}
