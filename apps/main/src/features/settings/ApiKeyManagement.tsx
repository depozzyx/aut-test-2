import { useCallback } from 'react'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Pagination } from '@peiko/components/Pagination'
import { ApiKeyList } from './containers/ApiKeyList'
import { setPagination, reset, selectPagination } from './store/api-key'
import { GenerateNewApiKey } from './containers/modals/GenerateNewApiKey'
import { ConfirmNewApiKey } from './containers/modals/ConfirmNewApiKey'
import { RevokeApiKey } from './containers/modals/RevokeApiKey'

export const ApiKeyManagement = (): JSX.Element => {
  const { t } = useTranslation('api-key')
  const { select, dispatch } = useRedux()
  const { modalState, setModal } = useModals()

  const { total, page, limit } = select(selectPagination, shallowEqual)

  const handleOpenCreateApiKeyModal = () => {
    setModal({ modalName: MODAL_NAMES.GENERATE_API_KEY, isOpen: true })
  }

  const handleChangePage = useCallback((newPage) => {
    dispatch(
      setPagination({
        page: newPage,
        limit: limit ?? 10,
        total,
      }),
    )
  }, [])

  useUnmount(() => {
    dispatch(reset())
  })

  const isShowGenerateApiKeyModal =
    modalState?.modalName === MODAL_NAMES.GENERATE_API_KEY && modalState.isOpen

  const isShowConfirmApiKeyModal =
    modalState?.modalName === MODAL_NAMES.CONFIRM_NEW_API_KEY && modalState.isOpen

  const isShowRevokeApiKeyModal =
    modalState?.modalName === MODAL_NAMES.REVOKE_API_KEY && modalState.isOpen

  return (
    <>
      <Flex width="100%" height="100%" direction="column" padding="16px 0 0 0">
        <Flex width="100%" justify="flex-end">
          <FilledButton
            size="m"
            maxWidth="236px"
            width="100%"
            onClick={handleOpenCreateApiKeyModal}
          >
            {t('generate')}
          </FilledButton>
        </Flex>
        <Flex justify="center" width="100%" padding="8px 0 0 0">
          <ApiKeyList />
        </Flex>
        <Flex justify="center" align="center" width="100%" margin="40px 0 0 0">
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
      {isShowGenerateApiKeyModal && <GenerateNewApiKey />}
      {isShowConfirmApiKeyModal && <ConfirmNewApiKey />}
      {isShowRevokeApiKeyModal && <RevokeApiKey />}
    </>
  )
}
