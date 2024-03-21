import { TPaginationData, TPaginationDataInput } from '../types'

export const getPaginationData = ({
  currentPage,
  lastPage,
  config,
}: TPaginationDataInput): TPaginationData => {
  const { before, after, first, last, dotsBefore, dotsAfter } = config

  const paginationData: TPaginationData = {
    currentPage,
    pagesBefore: [],
    pagesAfter: [],
  }

  if (first && currentPage > before + 1) {
    paginationData.firstPage = 1
  }

  if (dotsBefore && currentPage > before + 2) {
    paginationData.dotsBefore = true
  }

  if (currentPage > 1) {
    const pagesBefore = []
    for (let i = before; i > 0; i -= 1) {
      if (currentPage - i !== 0) {
        pagesBefore.push(currentPage - i)
      }
    }
    paginationData.pagesBefore = pagesBefore
  }

  if (lastPage - currentPage > 0) {
    const pagesAfter = []
    for (let i = 1; i < after + 1; i += 1) {
      if (currentPage + i > lastPage) {
        break
      }
      pagesAfter.push(currentPage + i)
    }
    paginationData.pagesAfter = pagesAfter
  }

  if (dotsAfter && lastPage - currentPage > after + 1) {
    paginationData.dotsAfter = true
  }

  if (last && lastPage - currentPage > after) {
    paginationData.lastPage = lastPage
  }

  return paginationData
}
