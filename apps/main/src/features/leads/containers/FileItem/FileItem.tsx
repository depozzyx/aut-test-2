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

import { Container } from '@peiko/components/loaders/Loader/Loader.styles'
import { TPreparedFiles } from '../../types/files'
import { useCounter } from '../../hooks/useCounter'
import { DuplicateText, ProgressBar } from './FileItem.styled'
import {
  deleteImportFile,
  importFilesAsync,
  selectFilesForImport,
  updateImportFiles,
} from '../../store/leads'

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

  const importProgress = files.find((f) => f.id === id)?.importProgress

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
                <Text variant="f10" color="main22">
                  {error && t('error')}
                  {!error && (
                    <>
                      <span style={{ marginRight: '2px' }}>
                        {t('uploaded')} <b>{imported ? '100' : count}%</b>
                      </span>
                      {`(${prettyBytes(
                        imported ? size : (size / 100) * count,
                      )}/${prettyBytes(size)})`}
                      <span style={{ marginLeft: '8px' }}>
                        {t('imported')} <b>{importProgress || '0'}%</b>
                      </span>
                    </>
                  )}
                </Text>
                {(startImporting || importProgress !== 100) && !error && (
                  <Container>
                    <LoaderIcon />
                  </Container>
                )}
                {imported && importProgress === 100 && !error && <CheckIcon />}
              </>
            )}
          </Flex>
        </Flex>
        <ProgressBar
          error={!!error}
          progress={imported ? 100 : count}
          importProgress={importProgress ?? 0}
        />
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
