import { TLeadStatusData } from '@/api-rest/leads/types'

export { LeadsTable } from './LeadsTable'

export const getLeadStatus = (
  leadStatuses: TLeadStatusData[],
  statusCode: string,
): string => {
  let statusName = leadStatuses.find((status) => status.value === statusCode)?.name
  if (!statusName && statusCode.startsWith('E('))
    statusName = statusCode.replace('E', 'Error')
  return statusName || ''
}
