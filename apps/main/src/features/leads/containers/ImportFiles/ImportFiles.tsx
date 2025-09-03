import { Flex } from '@/components/Flex'
import { UploadFiles } from '@/components/UploadFiles'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { CloudIcon } from '@/icons/CloudIcon'
import { useRedux } from '@/hooks/use-redux'
import { v4 as uuidV4 } from 'uuid'
import Trans from 'next-translate/Trans'
import { RadioButton } from '@peiko/components/inputs/RadioButton/RadioButton'
import { Tooltip } from '@peiko/components/Tooltip'
import { Trigger } from '@/features/agents/components/CampaignsTooltip/CampaignsTooltip.styled'
import { SmallInfoIcon } from '@peiko/components/icons/SmallInfoIcon/SmallInfoIcon'
import { LeadListSelect } from '@/features/leads/containers/LeadListSelect'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Button } from '@/features/leads/containers/LeadListSelect/LeadListSelect.styled'
import { palette } from '@peiko/styles/palette'
import { BottomText } from './ImportFiles.styled'
import {
  cancelImportFiles,
  getLeadStatuses,
  selectFilesForImport,
  selectIsLoading,
  selectLeadsGroup,
  selectLeadsGroupError,
  selectLeadStatuses,
  selectUseDefaultStatus,
  setImportFiles,
  setUseDefaultStatus,
} from '../../store/leads'
import { TPreparedFiles } from '../../types/files'
import { ImportFilesList } from '../ImportFilesList'

const MAX_WIDTH = '616px'

interface ImportFilesProps {
  onSubmit: () => void
}

const MAX_FILE_SIZE_MB = 4
const MAX_FILES = 10

export const ImportFiles: FC<ImportFilesProps> = ({ onSubmit }) => {
  const { t } = useTranslation('import-leads')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const leadsGroup = select(selectLeadsGroup)
  const filesForImport = select(selectFilesForImport)
  const useDefaultStatus = select(selectUseDefaultStatus)
  const leadStatuses = select(selectLeadStatuses)
  const leadsGroupError = select(selectLeadsGroupError)
  const isLoading = select(selectIsLoading)

  const setStatusSource = (value: string) => dispatch(setUseDefaultStatus(value))

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (leadsGroupError) {
      setError(leadsGroupError)
    }
  }, [leadsGroupError])

  const onDrop = async (files: File[]) => {
    const newFiles = files
      .filter(
        (file) =>
          !filesForImport.some(
            (existingFile) =>
              existingFile.name === file.name && existingFile.size === file.size,
          ),
      )
      .sort((a, b) => b.size - a.size)

    if (newFiles.length === 0) return

    const allFiles = [...filesForImport, ...newFiles]
    setError(null)
    if (allFiles.length > MAX_FILES) {
      setError(t('validation.max-files', { count: MAX_FILES }))
      return
    }
    const limitSize = MAX_FILE_SIZE_MB * 1000 * 1000
    const isSizeMoreThanLimit =
      allFiles.some((f) => f.size > limitSize) ||
      allFiles.reduce((acc, f) => acc + f.size, 0) > limitSize

    if (isSizeMoreThanLimit) {
      setError(t('validation.max-file-size', { size: MAX_FILE_SIZE_MB }))
      return
    }

    const preparedFilesPromises: Promise<TPreparedFiles>[] = newFiles.map(
      async (file) => {
        const { name, size, type } = file
        const reader = new FileReader()

        const data = await new Promise<string | ArrayBuffer | null>((resolve) => {
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(file)
        })

        return { name, size, type, data, id: uuidV4() }
      },
    )

    const preparedFiles = await Promise.all(preparedFilesPromises)

    dispatch(setImportFiles(preparedFiles))
  }

  const handleSubmit = async () => {
    onSubmit()
  }

  const onButtonClick = () => {
    fetch('/files/sample_leads.csv').then((response) => {
      response.blob().then((blob) => {
        if (typeof window !== 'undefined') {
          const fileURL = window.URL.createObjectURL(blob)
          let alink = document.createElement('a')
          alink.href = fileURL
          alink.download = 'sample_leads.csv'
          alink.click()
        }
      })
    })
  }

  const onCreate = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_LEADS_GROUP, isOpen: true })
  }

  const resetFiles = () => {
    dispatch(cancelImportFiles())
  }

  return (
    <Flex
      justify="center"
      align="center"
      styles={{ flex: 1, marginTop: '62px' }}
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
        <Flex styles={{ marginBottom: '12px' }} justify="center">
          <Flex justify="start" direction="column" gap="12px">
            <LeadListSelect
              width="100%"
              label={{ label: t('selectLabel') }}
              placeholder={t('selectPlaceholder')}
              maxMenuHeight={200}
              withoutEmpty
              menuContent={{
                place: 'append',
                element: (
                  <Button width="100%" onClick={onCreate}>
                    <Flex
                      padding="7px 16px"
                      align="center"
                      justify="space-between"
                      cursor="pointer"
                      width="100%"
                    >
                      <Text variant="f8">{t('createNewList')}</Text>
                      <PlusIcon width="24px" height="24px" />
                    </Flex>
                  </Button>
                ),
              }}
            />
            <Text variant="f6">{t('checkNumberUnique')}</Text>
          </Flex>
        </Flex>
        <Flex gap="12px" justify="center" styles={{ marginBottom: '14px' }}>
          <Flex
            gap="4px"
            styles={{ cursor: 'pointer' }}
            onClick={() => setStatusSource('fromFile')}
          >
            <RadioButton
              name="fromFile"
              onChange={(e) => setStatusSource(e.target.value)}
              inputProps={{
                value: 'fromFile',
                checked: useDefaultStatus === 'fromFile',
              }}
            />
            <Text>{t('fromFile')}</Text>
          </Flex>
          <Flex
            gap="4px"
            styles={{ cursor: 'pointer' }}
            onClick={() => setStatusSource('default')}
          >
            <RadioButton
              name="default"
              onChange={(e) => setStatusSource(e.target.value)}
              inputProps={{
                value: 'default',
                checked: useDefaultStatus === 'default',
              }}
            />
            <Text>{t('default')}</Text>
          </Flex>
        </Flex>
        <Flex justify="center" styles={{ marginBottom: '14px' }}>
          <Tooltip
            trigger={
              <Trigger startAdornment={<SmallInfoIcon />}>
                <Text variant="f8" color="base">
                  {t('tooltip.title')}
                </Text>
              </Trigger>
            }
            renderMenu={() => (
              <Flex direction="column" gap="12px">
                <Flex
                  direction="row"
                  justify="start"
                  margin="0 0 8px"
                  gap="12px"
                  padding="16px 24px 0"
                >
                  <Text variant="f8" color="base" styles={{ minWidth: '12rem' }}>
                    {t('tooltip.code')}
                  </Text>
                  <Text variant="f8" color="base">
                    {t('tooltip.description')}
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  gap="12px"
                  styles={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '0 24px',
                    marginBottom: '2px',
                  }}
                >
                  {leadStatuses.map((status) => (
                    <Flex
                      key={status.value}
                      direction="row"
                      justify="start"
                      gap="12px"
                      styles={{ borderBottom: '1px solid white' }}
                    >
                      <Text variant="f8" color="base" styles={{ minWidth: '12rem' }}>
                        {status.value}
                      </Text>
                      <Text variant="f8" color="base">
                        {status.name}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            )}
            closeOnDocumentClick
            contentBackgroundColor="main3"
            arrowColor="main3"
            contentBorderColor="main3"
            padding="0"
          />
        </Flex>
        <UploadFiles
          styles={{
            maxWidth: '552px',
            width: '100%',
            textAlign: 'center',
            marginBottom: '14px',
          }}
          // maxFiles={10}
          // maxSize={1024 * 1024 * 4}
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
                values={{ value: '4 Mb' }}
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
                values={{ value: '10' }}
              />
            </Text>
          </Flex>
        </UploadFiles>
        <ImportFilesList />
        {error && (
          <Text styles={{ color: palette.main13, textAlign: 'center' }} variant="f8">
            {error}
          </Text>
        )}
        <Flex justify="space-between" gap="24px" margin="12px 0 0">
          <OutlinedButton onClick={resetFiles} width="100%">
            {t('cancel')}
          </OutlinedButton>
          <FilledButton
            disabled={
              isLoading ||
              filesForImport.length === 0 ||
              filesForImport.some(
                (file) =>
                  file?.uploadProgress !== 100 ||
                  file.error?.length ||
                  ((file?.duplicatedPhoneNumbers?.length ?? 0) > 0 &&
                    file.duplicatedPhoneNotFixed) ||
                  (file?.validationErrors?.length ?? 0) > 0 ||
                  file?.unknownStatusesNotFixed,
              )
            }
            width="100%"
            onClick={handleSubmit}
          >
            {t('submit')}
          </FilledButton>
        </Flex>
      </Card>
      <Flex gap="30px" align="center" styles={{ maxWidth: MAX_WIDTH, width: '100%' }}>
        <BottomText color="main3" variant="f8">
          {t('downloadTemplateText')}
        </BottomText>
        <OutlinedButton onClick={onButtonClick}>{t('downloadTemplate')}</OutlinedButton>
      </Flex>
    </Flex>
  )
}
