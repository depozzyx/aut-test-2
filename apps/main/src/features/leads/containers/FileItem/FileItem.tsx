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

import dynamic from 'next/dynamic'
import { TPreparedFiles } from '../../types/files'
import { useCounter } from '../../hooks/useCounter'
import { DuplicateText, ProgressBar } from './FileItem.styled'
import {
  deleteImportFile,
  importFilesAsync,
  selectFilesForImport,
  updateImportFiles,
} from '../../store/leads'
// ...existing code...
import { TUnknownStatuses } from '../../../../api/rest/leads/types'

const UnknownStatusModal = dynamic(
  () => import('../modals').then((mod) => mod.UnknownStatusModal),
  {
    ssr: false,
  },
)
const ImportErrorsModal = dynamic(
  () => import('../modals').then((mod) => mod.ImportErrorsModal),
  {
    ssr: false,
  },
)

const DuplicatedNumbersModal = dynamic(
  () => import('../modals').then((mod) => mod.DuplicatedNumbersModal),
  {
    ssr: false,
  },
)

export const FileItem: FC<TPreparedFiles & { onDelete: (id: string) => void }> = ({
  id,
  name,
  size,
  duplicate,
  startImporting,
  imported,
  error,
  validationErrors,
  duplicatedPhoneNumbers,
  duplicatedPhoneNotFixed,
  unknownStatuses,
  unknownStatusesNotFixed,
  canceled,
  onDelete,
}) => {
  const { t } = useTranslation('import-leads')
  const { count, startCounter } = useCounter(100, 1500)
  const { select, dispatch } = useRedux()
  const files = select(selectFilesForImport)
  const [controller, setController] = useState<null | AbortController>(null)

  const [showUnknownStatusesModal, setShowUnknownStatusesModal] = useState(false)
  const [showImportErrorsModal, setShowImportErrorsModal] = useState(false)
  const [showDuplicatedNumbersModal, setShowDuplicatedNumbersModal] = useState(false)

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

  const setUnknownTable = (table: TUnknownStatuses[]) => {
    if (!table) return
    const unknownStatusesNotFixed = !table.every(
      (item) => !!(item.createNew ? item.description : item.replaceWith),
    )
    dispatch(
      updateImportFiles(
        files.map((item) => {
          if (item.duplicate) return item
          if (item.id === id)
            return { ...item, unknownStatuses: table, unknownStatusesNotFixed }
          return item
        }),
      ),
    )
  }

  const uploadProgress = files.find((f) => f.id === id)?.uploadProgress
  const onCloseUnknownStatusesModal = (table?: TUnknownStatuses[]) => {
    setShowUnknownStatusesModal(false)
    if (table && Array.isArray(table)) setUnknownTable(table)
  }

  const setRemoveDuplicatedNumbers = () => {
    dispatch(
      updateImportFiles(
        files.map((item) => {
          if (item.duplicate) return item
          if (item.id === id) return { ...item, duplicatedPhoneNotFixed: false }
          return item
        }),
      ),
    )
  }

  const onCloseDuplicatedNumbersModal = (confirm?: 'remove') => {
    setShowDuplicatedNumbersModal(false)
    if (confirm === 'remove') {
      setRemoveDuplicatedNumbers()
    }
  }

  return (
    <>
      <Flex gap="8px" align="start">
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
                      </>
                    )}
                  </Text>
                  {(startImporting || uploadProgress !== 100) && !error && (
                    <Container>
                      <LoaderIcon />
                    </Container>
                  )}
                  {imported && uploadProgress === 100 && !error && <CheckIcon />}
                </>
              )}
            </Flex>
          </Flex>
          <ProgressBar
            error={!!error}
            progress={imported ? 100 : count}
            uploadProgress={uploadProgress ?? 0}
          />
          {error && (
            <>
              {error.map((e) => (
                <ErrorText key={e}>{e}</ErrorText>
              ))}
            </>
          )}
          <Flex
            direction="row"
            gap="12px"
            justify="center"
            styles={{ marginBottom: '14px' }}
          >
            {(validationErrors?.length || undefined) && (
              <Text
                variant="f10"
                styles={{ textDecoration: 'underline', cursor: 'pointer' }}
                color="main13"
                tag="span"
                onClick={() => setShowImportErrorsModal(true)}
              >
                {t('validation-errors')}
              </Text>
            )}
            {(unknownStatuses?.length || undefined) && (
              <Text
                variant="f10"
                styles={{ textDecoration: 'underline', cursor: 'pointer' }}
                color={unknownStatusesNotFixed ? 'main13' : 'main22'}
                tag="span"
                onClick={() => setShowUnknownStatusesModal(true)}
              >
                {t('unknown-statuses')}
              </Text>
            )}
            {(duplicatedPhoneNumbers?.length || undefined) && (
              <Text
                variant="f10"
                styles={{ textDecoration: 'underline', cursor: 'pointer' }}
                color={duplicatedPhoneNotFixed ? 'main13' : 'main22'}
                tag="span"
                onClick={() => setShowDuplicatedNumbersModal(true)}
              >
                {t('duplicate')}
              </Text>
            )}
          </Flex>
        </Box>
        <Box styles={{ width: '24px' }}>
          {imported || error ? (
            <BaseButton onClick={() => onDelete(id)}>
              <BinIcon />
            </BaseButton>
          ) : (
            <>
              <BaseButton disabled={!startImporting} onClick={onCancel}>
                <CloseIcon color="main22" />
              </BaseButton>
            </>
          )}
        </Box>
      </Flex>
      {showUnknownStatusesModal && unknownStatuses && unknownStatuses.length > 0 && (
        <UnknownStatusModal
          onClose={onCloseUnknownStatusesModal}
          unknownStatusesTable={unknownStatuses}
        />
      )}
      {showImportErrorsModal && validationErrors && validationErrors.length > 0 && (
        <ImportErrorsModal
          onClose={() => setShowImportErrorsModal(false)}
          validationErrors={validationErrors}
        />
      )}
      {showDuplicatedNumbersModal &&
        duplicatedPhoneNumbers &&
        duplicatedPhoneNumbers.length > 0 && (
          <DuplicatedNumbersModal
            onClose={onCloseDuplicatedNumbersModal}
            duplicatedNumbers={duplicatedPhoneNumbers ?? []}
            files={files}
            currentFileId={id}
          />
        )}
    </>
  )
}
