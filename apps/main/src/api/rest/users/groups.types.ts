import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TPagination, TPaginatedRes } from '@/types/entities/pagination'
import { TAgent } from '../agents/types'

export type TAgentGroup = {
  id: number
  name: string
  description?: string | null
  agents?: TAgent[]
  createdAt?: string
}

export type TAgentGroupsReq = Partial<
  Pick<TPagination, 'page' | 'limit'> & {
    name: string
    ids: number[]
  }
>

export type TCreateAgentGroupReq = {
  name: string
  description?: string
  userIds: number[]
}

export type TUpdateAgentGroupReq = Partial<TCreateAgentGroupReq>

export type TSetAgentGroupUsersReq = {
  userIds: number[]
}

export type TAgentGroupRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: TAgentGroup
}

export type TAgentGroupsRes = TPaginatedRes<TAgentGroup>
