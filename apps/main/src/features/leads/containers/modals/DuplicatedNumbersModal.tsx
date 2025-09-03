import React from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import styled, { useTheme } from 'styled-components'
import { fonts } from '@peiko/styles/fonts'
import { cssStringToObject } from '@peiko/styles/utils/style-to-css'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { CopyIcon } from '@peiko/components/icons/CopyIcon'
import { Tooltip } from '@peiko/components/Tooltip'
import { DuplicatedPhoneNumbers, TPreparedFiles } from '../../types/files'

const StyledCopyIconWrapper = styled.div`
  display: inline-flex;
  transition: transform 150ms;
  &:hover {
    transform: scale(1.2);
  }
`

export const DuplicatedNumbersModal = ({
  duplicatedNumbers,
  files,
  currentFileId,
  onClose,
}: {
  duplicatedNumbers: DuplicatedPhoneNumbers[]
  files: TPreparedFiles[]
  currentFileId: string
  onClose: (removeDuplicates: 'remove' | undefined) => void
}): JSX.Element => {
  const { t } = useTranslation('import-leads')
  const theme = useTheme()

  const { resetModals } = useModals()

  const onCloseModal = (removeDuplicates?: 'remove') => {
    resetModals()
    onClose(removeDuplicates)
  }

  const getDescription = (item: DuplicatedPhoneNumbers) => {
    const descriptions = []
    if (item.existInDatabase)
      descriptions.push(t('DuplicatedNumbersModal.where-duplicated.in-database'))

    const fileNames = item.filesIds
      .map((fileId) => {
        if (fileId === currentFileId) {
          return t('DuplicatedNumbersModal.where-duplicated.in-this-file', {
            fileName: files.find((file) => file.id === fileId)?.name,
          })
        }
        const fileName = files.find((file) => file.id === fileId)?.name

        if (!fileName) return ''
        return t('DuplicatedNumbersModal.where-duplicated.in-file', {
          fileName: files.find((file) => file.id === fileId)?.name,
        })
      })
      .filter(Boolean)

    return [...descriptions, ...fileNames]
  }

  const duplicatedNumbersTable = duplicatedNumbers.map((item, index) => ({
    id: index,
    phoneNumber: item.phoneNumber,
    description: getDescription(item),
  }))

  const Cell = ({
    flex,
    texts,
  }: {
    flex: string | number | undefined
    texts: string[]
  }) => (
    <div
      style={{
        flex,
        padding: '8px',
        borderLeft: `1px solid ${theme.palette.main22}`,
        ...cssStringToObject(fonts.f8),
      }}
    >
      {texts.map((text, index) => (
        <Text
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          variant="f8"
          styles={{ wordBreak: 'break-word', textAlign: 'center' }}
        >
          {text}
        </Text>
      ))}
    </div>
  )

  return (
    <ModalMessage
      title={t('DuplicatedNumbersModal.title')}
      description={t('DuplicatedNumbersModal.description')}
      open
      disableCloseOutside
      onClose={onCloseModal}
      containerWidth="100%"
      maxWidth="80vh"
      left="106px"
      position="relative"
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
                  flex: 4,
                  padding: '8px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('DuplicatedNumbersModal.columns.phone-numbers')}
                </Text>
              </div>
              <div
                style={{
                  flex: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Text variant="f8" color="base" styles={{ textAlign: 'center' }}>
                  {t('DuplicatedNumbersModal.columns.where-duplicated')}
                </Text>
              </div>
            </div>
            <div
              style={{
                maxHeight: '60vh',
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {duplicatedNumbersTable.map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.phoneNumber}-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderBottom: `1px solid ${theme.palette.main22}`,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      flex: 4,
                      padding: '8px',
                      wordBreak: 'break-word',
                    }}
                  >
                    <Flex direction="row" justify="space-between" align="center">
                      <Text
                        variant="f8"
                        styles={{
                          width: '100%',
                          wordBreak: 'break-word',
                          textAlign: 'center',
                        }}
                      >
                        {item.phoneNumber}
                      </Text>
                      <Tooltip
                        on={['click']}
                        padding="4px 8px"
                        contentBackgroundColor="main3"
                        position="bottom center"
                        zIndex={9999}
                        liveTime={1000}
                        arrow={false}
                        keepTooltipInside
                        closeOnDocumentClick={false}
                        trigger={
                          <BaseButton>
                            <StyledCopyIconWrapper>
                              <CopyIcon size="s" />
                            </StyledCopyIconWrapper>
                          </BaseButton>
                        }
                        renderMenu={() => (
                          <Text variant="f8" color="base">
                            {t('copied to clipboard')}
                          </Text>
                        )}
                        onOpen={() => {
                          navigator.clipboard.writeText(item.phoneNumber)
                        }}
                        onClose={() => {
                          //
                        }}
                      />
                    </Flex>
                  </div>
                  <Cell flex={8} texts={item.description as string[]} />
                </div>
              ))}
            </div>
          </div>
        </Flex>
        <Flex justify="space-between" gap="24px" margin="48px 0 0">
          <OutlinedButton
            styles={{ minWidth: '250px' }}
            onClick={() => onCloseModal()}
            width="100%"
          >
            {t('DuplicatedNumbersModal.buttons.cancel')}
          </OutlinedButton>
          <FilledButton
            styles={{ minWidth: '250px' }}
            onClick={() => onCloseModal('remove')}
          >
            {t('DuplicatedNumbersModal.buttons.submit')}
          </FilledButton>
        </Flex>
      </Flex>
    </ModalMessage>
  )
}
