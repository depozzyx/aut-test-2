import React, { FC, useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'
import { FileIcon } from '@/icons/FileIcon'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import { BinIcon } from '@/icons/BinIcon'
import { Flex } from '@/components/Flex'
import { CheckIcon } from '@/icons/CheckIcon'
import { ErrorText } from '@peiko/components/inputs/ErrorText'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { useRedux } from '@/hooks/use-redux'
import { LoaderIcon } from '@peiko/components/icons/Loader/LoaderIcon'
import styled, { keyframes } from 'styled-components'

import { TLoaderProps } from '@peiko/components/loaders/Loader/types'
import { TPreparedFiles } from '../../types/files'
import { useCounter } from '../../hooks/useCounter'
import { DuplicateText, ProgressBar } from './FileItem.styled'
import {
  deleteImportFile,
  importFilesAsync,
  selectFilesForImport,
  updateImportFiles,
} from '../../store/leads'

const rotateLoader = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
  } 
`

export const Container = styled.span<{
  position?: TLoaderProps['position']
  top?: TLoaderProps['top']
  left?: TLoaderProps['left']
}>`
  margin-left: 8px;
  line-height: 0;
  animation: ${rotateLoader} 2s linear infinite;
  top: ${({ top }) => top || 0};
  left: ${({ left }) => left || 0};
  position: ${({ position }) => position || 'relative'};
  z-index: ${({ position, theme }) => (position === 'fixed' ? theme.zIndex.medium : 1)};
`

export const FileItem: FC<TPreparedFiles & { onDelete: (id: string) => void }> = ({
  id,
  name,
  size,
  duplicate,
  startImporting,
  imported,
  error,
  canceled,
  onDelete,
}) => {
  const { t } = useTranslation('import-leads')
  const { count, startCounter } = useCounter(99, 1500)
  const { select, dispatch } = useRedux()
  const files = select(selectFilesForImport)
  const [controller, setController] = useState<null | AbortController>(null)

  useEffect(() => {
    if (startImporting) startCounter()
  }, [startImporting])

  useEffect(() => {
    const activeIndex = files.findIndex((file) => file.id === id)
    const startImportCondition =
      !imported && !error && !startImporting && !canceled && !duplicate
    const importFiles = () => {
      if (startImportCondition)
        dispatch(importFilesAsync(id, (controller) => setController(controller)))
    }

    if (activeIndex === 0) importFiles()
    else if (
      activeIndex > 0 &&
      (files[activeIndex - 1].imported ||
        files[activeIndex - 1].error ||
        files[activeIndex - 1].canceled)
    )
      importFiles()
  }, [files])

  const onCancel = () => {
    dispatch(
      updateImportFiles(
        files.map((item) => {
          if (item.duplicate) return item
          if (item.id === id) return { ...item, canceled: true }
          return item
        }),
      ),
    )
    dispatch(deleteImportFile(id))
    controller?.abort()
  }

  return (
    <Flex gap="8px" align="center">
      <FileIcon width="40px" height="40px" />
      <Box styles={{ flex: '1' }}>
        <Flex justify="space-between" align="center">
          <Text variant="f8">{name}</Text>
          <Flex align="center">
            {duplicate && (
              <DuplicateText variant="f10" color="main13">
                {t('duplicate')}
              </DuplicateText>
            )}
            {!duplicate && (
              <>
                {imported && <CheckIcon />}
                <Text variant="f10" color="main22">
                  {error && t('error')}
                  {!error && (
                    <span>
                      {imported ? '100%' : `${count}%`}{' '}
                      {`(${prettyBytes(
                        imported ? size : (size / 100) * count,
                      )}/${prettyBytes(size)})`}
                    </span>
                  )}
                </Text>
                {startImporting && (
                  <Container>
                    <LoaderIcon />
                  </Container>
                )}
              </>
            )}
          </Flex>
        </Flex>
        <ProgressBar error={!!error} progress={imported ? 100 : count} />
        {error && (
          <>
            {error.map((e) => (
              <ErrorText key={e}>{e}</ErrorText>
            ))}
          </>
        )}
      </Box>
      <Box styles={{ width: '24px' }}>
        {duplicate || error ? (
          <BaseButton onClick={() => onDelete(id)}>
            <BinIcon />
          </BaseButton>
        ) : (
          <>
            {!imported && (
              <BaseButton disabled={!startImporting} onClick={onCancel}>
                <CloseIcon color="main22" />
              </BaseButton>
            )}
          </>
        )}
      </Box>
    </Flex>
  )
}
