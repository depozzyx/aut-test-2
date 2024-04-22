export type TPreparedFiles = {
  name: string
  size: number
  type: string
  data: string | ArrayBuffer | null
  id: string
  duplicate?: boolean
  startImporting?: boolean
  imported?: boolean
  error?: string
}
