import { TPagination } from '../types/entities/pagination'

export const getMaxPage = (pagination: TPagination, newPage: number): number => {
  const lastPage = Math.ceil(pagination.total / (pagination?.limit ?? 10))
  return lastPage < newPage ? Math.max(1, lastPage) : newPage
}

export const calculateNewPage = (pagination: TPagination): TPagination => ({
  ...pagination,
  page: getMaxPage(pagination, pagination.page),
})
