export type TAgent = {
  id: number
  name: string
  email: string
  role: string
  campaigns: string[]
}

export const agentsMock: TAgent[] = [
  {
    id: 1,
    name: 'Howard Esther',
    email: 'howardesther.example.com',
    role: 'manager',
    campaigns: ['Campaign Name 1', 'Campaign Name 2', 'Campaign Name 3'],
  },
  {
    id: 2,
    name: 'Esther Howard',
    email: 'estherhoward.example.com',
    role: 'manager',
    campaigns: ['Campaign Name 4', 'Campaign Name 5', 'Campaign Name 6'],
  },
  {
    id: 3,
    name: 'Donald Trump',
    email: 'donaldtrump.example.com',
    role: 'manager',
    campaigns: ['Campaign Name 7', 'Campaign Name 8', 'Campaign Name 9'],
  },
]
