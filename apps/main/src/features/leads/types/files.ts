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
  canceled?: boolean

  importProgress?: number
  // uploadProgress?: number
}

export type TImportProgress = {
  id: string
  importProgress: number
}

export type TImportError = {
  code: string
  errors: {
    validationErrors: {
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
    }[]
  }
}
