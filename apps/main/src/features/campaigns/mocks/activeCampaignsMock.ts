export type TActiveCampaign = {
  id: number
  name: string
  date: string
  callVolume: string
  responseRate: number
  conversionRate: number
}

export const activeCampaignsMock: TActiveCampaign[] = [
  {
    id: 1,
    name: 'Campaign Name 1',
    date: '21/01/2024',
    callVolume: 'Every hour',
    responseRate: 20.9,
    conversionRate: 11.2,
  },
  {
    id: 2,
    name: 'Campaign Name 2',
    date: '22/01/2024',
    callVolume: 'Every day',
    responseRate: 21.5,
    conversionRate: 11.2,
  },
  {
    id: 3,
    name: 'Campaign Name 3',
    date: '23/01/2024',
    callVolume: 'Every week',
    responseRate: 22,
    conversionRate: 11.2,
  },
]
