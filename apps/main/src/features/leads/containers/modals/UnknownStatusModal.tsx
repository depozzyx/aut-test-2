import React from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { useTheme } from 'styled-components'
import { Checkbox } from '@peiko/components/inputs/checkboxes/Checkbox'
import { Select } from '@peiko/components/inputs/Select/Select'
import { Input } from '@peiko/components/inputs/Input'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { TUnknownStatuses } from '../../../../api/rest/leads/types'
import { selectLeadStatuses } from '../../store/leads'
import { useRedux } from '../../../../hooks/use-redux'

export const UnknownStatusModal = ({
  unknownStatusesTable,
  onClose,
}: {
  unknownStatusesTable: TUnknownStatuses[]
  onClose: (unknownStatuses?: TUnknownStatuses[]) => void
}): JSX.Element => {
  const { t } = useTranslation('import-leads')
  const theme = useTheme()
  const { select } = useRedux()
  const leadStatuses = select(selectLeadStatuses)

  const { resetModals } = useModals()
  const [tableState, setTableState] =
    React.useState<TUnknownStatuses[]>(unknownStatusesTable)

  const onCloseModal = (tableState?: TUnknownStatuses[]) => {
    resetModals()
    onClose(tableState)
  }

  return (
    <ModalMessage
      title={t('UnknownStatusModal.title')}
      description={t('UnknownStatusModal.description')}
      open
      onClose={onCloseModal}
      containerWidth="100%"
      maxWidth="80vh"
      left="106px"
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        styles={{
          marginTop: '10px',
          width: '100%',
        }}
      >
        <Flex styles={{ marginTop: '10px', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                background: theme.palette.main4,
                color: 'white',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  flex: 3,
                  padding: '8px',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('UnknownStatusModal.columns.status')}
                </Text>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '8px',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('UnknownStatusModal.columns.create')}
                </Text>
              </div>
              <div
                style={{
                  flex: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('UnknownStatusModal.columns.replace-with')}
                </Text>
              </div>
            </div>
            {tableState.map((item, index) => (
              <div
                key={item.status}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  borderBottom: `1px solid ${theme.palette.main22}`,
                }}
              >
                <div style={{ flex: 3, padding: '8px', textAlign: 'center' }}>
                  <Text variant="f8">{item.status}</Text>
                </div>
                <Flex
                  justify="center"
                  styles={{ flex: 1, padding: '8px', textAlign: 'center' }}
                >
                  <Checkbox
                    size="s"
                    value={item.createNew}
                    onChange={(e) => {
                      setTableState((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, createNew: e.value } : row,
                        ),
                      )
                    }}
                    name="numbers"
                  />
                </Flex>
                {item.createNew && (
                  <div style={{ flex: 8, padding: '8px' }}>
                    <Input
                      name={`replaceWith-${item.status}`}
                      size="s"
                      maxLength={30}
                      value={item.description}
                      onChange={(e) => {
                        setTableState((prev) =>
                          prev.map((row, i) =>
                            i === index
                              ? {
                                  ...row,
                                  description: e,
                                }
                              : row,
                          ),
                        )
                      }}
                    />
                  </div>
                )}
                {!item.createNew && (
                  <div style={{ flex: 8, padding: '8px' }}>
                    <Select
                      width="100%"
                      name={`description-${item.status}`}
                      options={leadStatuses.map((status) => ({
                        label: status.name,
                        value: status.value,
                      }))}
                      value={item.replaceWith}
                      onChange={(e) => {
                        setTableState((prev) =>
                          prev.map((row, i) =>
                            i === index
                              ? {
                                  ...row,
                                  replaceWith:
                                    typeof e?.value === 'string' ? e.value : undefined,
                                }
                              : row,
                          ),
                        )
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Flex>
        <Flex justify="space-between" gap="24px" margin="48px 0 0">
          <OutlinedButton
            styles={{ minWidth: '250px' }}
            onClick={() => onCloseModal()}
            width="100%"
          >
            {t('UnknownStatusModal.buttons.cancel')}
          </OutlinedButton>
          <FilledButton
            disabled={tableState.some(
              (item) =>
                (item.createNew && !item.description) ||
                (!item.createNew && !item.replaceWith),
            )}
            styles={{ minWidth: '250px' }}
            onClick={() => onCloseModal(tableState)}
          >
            {t('UnknownStatusModal.buttons.submit')}
          </FilledButton>
        </Flex>
      </Flex>
    </ModalMessage>
  )
}
