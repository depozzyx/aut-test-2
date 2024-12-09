export type TCallsInit = {
  lead: {
    id: number
    name: string
    phone: string
    status: string
    timezone: string
    source: string
    leadListId: number
    createdAt: string
    updatedAt: string
    deletedAt: number
  }
  campaign: {
    id: number
    managerId: number
    intensity: number
    intensityPerAgent: number
    status: string
    name: string
    preferredCallTime: string
    holdTime: number
    createdAt: string
    updatedAt: string
    deletedAt: string
  }
  agent: {
    id: number
    email: string
    username: string
    pbxName: string
    workStatus: string
    createdAt: string
  }
  dst: string
  requestId: string
}
