export type TLeadListStatus = 'active' | 'inactive'

export type TLeadsList = {
  id: number
  name: string
  timezone: string
  status: 'active' | 'inactive'
  phone: string
  source: string
}
