import React, { FC, useEffect } from 'react'
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
import { TPreparedFiles } from '../../types/files'
import { useCounter } from '../../hooks/useCounter'
import { ProgressBar } from './FileItem.styled'

export const FileItem: FC<TPreparedFiles & { onDelete: (id: string) => void }> = ({
  id,
  name,
  size,
  duplicate,
  startImporting,
  imported,
  error,
  onDelete,
}) => {
  const { t } = useTranslation('import-leads')
  const { count, startCounter } = useCounter(99, 1500)

  useEffect(() => {
    if (startImporting) startCounter()
  }, [startImporting])

  return (
    <Flex gap="8px" align="center">
      <FileIcon width="40px" height="40px" />
      <Box styles={{ flex: '1' }}>
        <Flex justify="space-between" align="center">
          <Text variant="f8">{name}</Text>
          <Flex align="center">
            {duplicate && (
              <Text variant="f10" color="main13">
                {t('duplicate')}
              </Text>
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
              </>
            )}
          </Flex>
        </Flex>
        <ProgressBar error={error} progress={imported ? 100 : count} />
        {error && <ErrorText>{error}</ErrorText>}
      </Box>
      <Box>
        {duplicate || error ? (
          <BaseButton onClick={() => onDelete(id)}>
            <BinIcon />
          </BaseButton>
        ) : (
          <BaseButton>
            <CloseIcon color="main22" />
          </BaseButton>
        )}
      </Box>
    </Flex>
  )
}
