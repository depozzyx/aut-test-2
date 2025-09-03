import React, { useCallback } from 'react'
import { shallowEqual } from 'react-redux'
import { useTheme } from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { useRedux } from '@/hooks/use-redux'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { setSelectedId, selectApiKeysList } from '@/features/settings/store/api-key'
import { THeader } from '@peiko/components/Table/types'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { Copy } from '@peiko/components/inputs/Input/components/Copy'
import { InfoCell } from '@/components/InfoCell'
import { useApiKeysList } from '../../hooks/useApiKeysList'

type TApiKeyListRowKeys = 'id' | 'key' | 'createdAt' | 'action'

export const ApiKeyList = (): JSX.Element | null => {
  const theme = useTheme()
  const { t } = useTranslation('api-key')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const { isLoading } = useApiKeysList()
  const apiKeyList = select(selectApiKeysList, shallowEqual)

  const handleRevokeApiKey = useCallback((id: number) => {
    dispatch(setSelectedId(id))
    setModal({ modalName: MODAL_NAMES.REVOKE_API_KEY, isOpen: true })
  }, [])

  const headers: THeader<TApiKeyListRowKeys>[] = [
    { label: t('table-headers.api-key'), value: 'key' },
    { label: t('table-headers.creation-date'), value: 'createdAt' },
    {
      label: (
        <Flex width="90%" justify="flex-end">
          <Text variant="f10" color="base">
            {t('table-headers.action')}
          </Text>
        </Flex>
      ),
      value: 'action',
    },
  ]

  const rows = apiKeyList.map((item) => ({
    row: {
      id: item.id,
      key: (
        <Flex align="center" gap={16}>
          <InfoCell title={item.key} />
          <Copy value={item.key} size="m" />
        </Flex>
      ),
      createdAt: <InfoCell title={formatCreatedAt(item.createdAt)} />,
      action: (
        <Flex width="100%" justify="flex-end">
          <OutlinedButton
            onClick={() => handleRevokeApiKey(item.id)}
            styles={{
              backgroundColor: theme.palette.base400,
              border: `1px solid ${theme.palette.main13}`,
              cursor: 'pointer',
              width: '100px',
              borderRadius: '20px',
              height: '28px',
            }}
          >
            <Text color="main13" variant="f10">
              {t('revoke')}
            </Text>
          </OutlinedButton>
        </Flex>
      ),
    },
  }))

  return (
    <Table
      loading={isLoading}
      headerData={headers}
      rowsData={rows}
      bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
      headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      emptyComponent={<EmptyComponent text={t('empty-data')} isLoading={isLoading} />}
    />
  )
}
