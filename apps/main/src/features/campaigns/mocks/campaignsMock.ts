import { TCampaignStatus } from '../types'

export type TCampaign = {
  id: number
  name: string
  date: string
  status: TCampaignStatus
  leads: number
  agents: number
}

export const campaignsMock: TCampaign[] = [
  {
    id: 1,
    name: 'Campaign Name 1',
    date: '11/09/2023',
    status: 'pause',
    leads: 150,
    agents: 10,
  },
  {
    id: 2,
    name: 'Campaign Name 2',
    date: '11/09/2023',
    status: 'active',
    leads: 150,
    agents: 10,
  },
  {
    id: 3,
    name: 'Campaign Name 3',
    date: '11/09/2023',
    status: 'complete',
    leads: 150,
    agents: 10,
  },
]
