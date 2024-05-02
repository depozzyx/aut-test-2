export type TActiveAgent = {
  id: number
  name: string
  status: string
  callsHandled: number
  callDuration: string
  rating: number
  timeOnline: string
  sumCallDuration: string
  activeSession: string
}

export const activeAgentsMock: TActiveAgent[] = [
  {
    id: 1,
    name: 'Esther Howard',
    status: 'finished',
    callsHandled: 20,
    callDuration: '3min 5sec',
    rating: 4.9,
    timeOnline: '15min 35sec',
    sumCallDuration: '35min 15sec',
    activeSession: 'New Campaign 1234',
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    status: 'on a call',
    callsHandled: 20,
    callDuration: '3min 5sec',
    rating: 4.9,
    timeOnline: '15min 35sec',
    sumCallDuration: '35min 15sec',
    activeSession: 'New Campaign 1234',
  },
  {
    id: 3,
    name: 'Jenny Wilson',
    status: 'pause',
    callsHandled: 20,
    callDuration: '3min 5sec',
    rating: 4.9,
    timeOnline: '15min 35sec',
    sumCallDuration: '35min 15sec',
    activeSession: 'New Campaign 1234',
  },
  {
    id: 4,
    name: 'Robert Fox',
    status: 'unpaused',
    callsHandled: 20,
    callDuration: '3min 5sec',
    rating: 4.9,
    timeOnline: '15min 35sec',
    sumCallDuration: '35min 15sec',
    activeSession: 'New Campaign 1234',
  },
]
