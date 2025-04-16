import useTranslation from 'next-translate/useTranslation'
import React, { FC, useCallback } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { required } from '@/utils/validation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { FormikRangeDayPicker } from '@/inputs/formik-adapters/FormikRangeDayPicker'
import { selectFilters } from '../../store/activity-log'
import { TFilters, useFilters } from '../../hooks/useFilters'
import { TFileType, useExportLogs } from '../../hooks/useExportLogs'

const OPTIONS: {
  label: string
  value: TFileType
}[] = [
  {
    label: 'PDF',
    value: 'pdf',
  },
  {
    label: 'CSV',
    value: 'csv',
  },
]

export const ExportLogs: FC<Pick<TFilters, 'managers'>> = ({ managers }) => {
  const { t } = useTranslation('activity-log')
  const { modalState, resetModals } = useModals()
  const { select } = useRedux()
  const exportLogsAsync = useExportLogs()

  const filters = select(selectFilters)
  const { actionTypes, orders } = useFilters()

  const showModal =
    modalState?.modalName === MODAL_NAMES.EXPORT_ACTIVITY_LOGS && modalState.isOpen

  const reset = (formik: TFormik) => {
    resetModals()
    formik.resetForm()
  }

  const formik: TFormik = useFormik({
    initialValues: {
      fileFormat: '',
      dates: {
        from: '',
        to: '',
      },
    },
    validationSchema: yup.object().shape({
      fileFormat: required,
      dates: yup.object().shape({
        from: required,
        to: required,
      }),
    }),
    onSubmit: (formData) => {
      const { orderBy, entityAction, userId } = filters

      exportLogsAsync({
        params: {
          orderBy,
          entityAction,
          userId,
          fromDate: formData.dates.from,
          toDate: formData.dates.to,
        },
        fileType: formData.fileFormat as TFileType,
        formik,
        onSuccess: resetModals,
      })
    },
  })

  const getFilters = useCallback(() => {
    const order = orders.find((item) => item.value === filters.order)?.label
    const action = actionTypes.find((item) => item.value === filters.entityAction)?.label
    const user = managers.find((item) => item.value === filters.userId)?.label
    const data: string[] = []
    if (action) data.push(action)
    if (order) data.push(order)
    if (user) data.push(user)
    return data.reduce((acc, item, i) => {
      if (i === 0) return item

      return `${acc}, ${item}`
    }, '')
  }, [orders, actionTypes, managers, filters])

  return (
    <ModalMessage
      title={<Text>{t('exportLogs.title')}</Text>}
      open={showModal}
      onClose={() => reset(formik)}
      containerWidth="100%"
      maxWidth="582px"
    >
      <Box styles={{ marginTop: '40px' }}>
        {getFilters() && (
          <Text variant="f9" styles={{ textAlign: 'center', marginBottom: '24px' }}>
            {t('exportLogs.selectedFilters')}{' '}
            <Text variant="f8" styles={{ display: 'inline-block' }}>
              {getFilters()}
            </Text>
          </Text>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="16px">
            <Flex justify="center">
              <FormikRangeDayPicker
                label={{ label: t('exportLogs.dateLabel') }}
                formik={formik}
                name="dates"
                zIndex={1000}
                menuClassName="multi-rs__clear-indicator"
              />
            </Flex>
            <Flex justify="center">
              <FormikSelect
                label={{ label: t('exportLogs.fileFormatLabel') }}
                placeholder={t('exportLogs.fileFormatPlaceholder')}
                formik={formik}
                options={OPTIONS}
                name="fileFormat"
                width="326px"
              />
            </Flex>
          </Flex>
          <Flex justify="space-between" gap="24px" margin="51px 0 0">
            <OutlinedButton onClick={() => reset(formik)} width="100%" type="button">
              {t('exportLogs.cancel')}
            </OutlinedButton>
            <FilledButton
              isLoading={formik.isSubmitting}
              //   disabled={!formik.dirty}
              width="100%"
              type="submit"
            >
              {t('exportLogs.submit')}
            </FilledButton>
          </Flex>
        </form>
      </Box>
    </ModalMessage>
  )
}
