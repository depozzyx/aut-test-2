import { Flex } from '@/components/Flex'
import { UploadFiles } from '@/components/UploadFiles'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { CloudIcon } from '@/icons/CloudIcon'
import { useRedux } from '@/hooks/use-redux'
import { nanoid } from '@reduxjs/toolkit'
import { ROUTES } from '@/constants/routes'
import Trans from 'next-translate/Trans'
import { LeadsSelect } from '../LeadsSelect'
import { BottomText } from './ImportFiles.styled'
import {
  importFilesAsync,
  selectFilesForImport,
  selectLeadsGroup,
  setImportFiles,
} from '../../store/leads'
import { TPreparedFiles } from '../../types/files'
import { ImportFilesList } from '../ImportFilesList'

const MAX_WIDTH = '616px'

export const ImportFiles: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { t } = useTranslation('import-leads')
  const { select, dispatch } = useRedux()

  const leadsGroup = select(selectLeadsGroup)
  const allFilesImported = select(selectFilesForImport).every((item) => item.imported)
  const filesForImport = select(selectFilesForImport)

  const onDrop = async (files: File[]) => {
    const preparedFilesPromises: Promise<TPreparedFiles>[] = files.map(async (file) => {
      const { name, size, type } = file
      const reader = new FileReader()

      const data = await new Promise<string | ArrayBuffer | null>((resolve) => {
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })

      return { name, size, type, data, id: nanoid() }
    })

    const preparedFiles = await Promise.all(preparedFilesPromises)

    dispatch(setImportFiles(preparedFiles))
    dispatch(importFilesAsync(preparedFiles))
  }

  return (
    <Flex
      justify="center"
      align="center"
      styles={{ flex: 1, marginTop: '82px' }}
      direction="column"
      gap="12px"
    >
      <Card maxWidth={MAX_WIDTH} padding="32px" styles={{ width: '100%' }}>
        <Text variant="f2" styles={{ marginBottom: '40px', textAlign: 'center' }}>
          {t('uploadFiles')}
        </Text>
        <Text variant="f7" styles={{ marginBottom: '24px', textAlign: 'center' }}>
          {t('preselectText')}
        </Text>
        <Flex styles={{ marginBottom: '24px' }} justify="center">
          <LeadsSelect
            width="calc(50% - 12px)"
            label={{ label: t('selectLabel') }}
            placeholder={t('selectPlaceholder')}
          />
        </Flex>
        <ImportFilesList />
        <UploadFiles
          styles={{ maxWidth: '552px', width: '100%', textAlign: 'center' }}
          maxFiles={20}
          maxSize={5242880}
          disabled={!leadsGroup}
          onDropAccepted={onDrop}
        >
          <Text variant="f8" color="main23">
            {t('dragFiles')}{' '}
            <Text color="main2" tag="span">
              {t('browse')}
            </Text>
          </Text>
          <CloudIcon width="40px" height="40px" />
          <Flex direction="column" gap="8px">
            <Text color="main23" variant="f10">
              <Trans
                i18nKey="import-leads:maxSize"
                components={[<Text tag="span" styles={{ fontWeight: '600' }} key="0" />]}
                values={{ value: '5 Mb' }}
              />
            </Text>
            <Text color="main23" variant="f10">
              <Trans
                i18nKey="import-leads:supportedTypes"
                components={[<Text tag="span" styles={{ fontWeight: '600' }} key="0" />]}
                values={{ value: 'CSV, XLSX' }}
              />
            </Text>
            <Text color="main23" variant="f10">
              <Trans
                i18nKey="import-leads:limit"
                components={[<Text tag="span" styles={{ fontWeight: '600' }} key="0" />]}
                values={{ value: '20' }}
              />
            </Text>
          </Flex>
        </UploadFiles>
        <Flex justify="space-between" gap="24px" margin="48px 0 0">
          <OutlinedButton link={{ href: ROUTES.CABINET_DASHBOARD }} width="100%">
            {t('cancel')}
          </OutlinedButton>
          <FilledButton
            disabled={filesForImport.length === 0 || !allFilesImported}
            width="100%"
            onClick={() => onSubmit()}
          >
            {t('submit')}
          </FilledButton>
        </Flex>
      </Card>
      <Flex gap="30px" align="center" styles={{ maxWidth: MAX_WIDTH, width: '100%' }}>
        <BottomText color="main3" variant="f8">
          {t('downloadTemplateText')}
        </BottomText>
        <OutlinedButton>{t('downloadTemplate')}</OutlinedButton>
      </Flex>
    </Flex>
  )
}
