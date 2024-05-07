import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
// import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'

const OPTIONS: {
  label: string
  value: 'pdf' | 'csv'
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

export const ExportLogs: FC = () => {
  const { t } = useTranslation('activity-log')
  const { modalState, resetModals } = useModals()
  //   const { dispatch } = useRedux()

  const showModal =
    modalState?.modalName === MODAL_NAMES.EXPORT_ACTIVITY_LOGS && modalState.isOpen

  const reset = (formik: TFormik) => {
    resetModals()
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      fileFormat: '',
    },
    validationSchema: yup.object().shape({
      fileFormat: validation.required,
    }),
    onSubmit: (formData) => {
      // eslint-disable-next-line no-console
      console.log(formData)
    },
  })

  return (
    <ModalMessage
      title={<Text>{t('exportLogs.title')}</Text>}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="582px"
    >
      <Box styles={{ marginTop: '40px' }}>
        <form onSubmit={formik.handleSubmit}>
          <Flex justify="center">
            <FormikSelect
              label={{ label: t('exportLogs.label') }}
              placeholder={t('exportLogs.placeholder')}
              formik={formik}
              options={OPTIONS}
              name="fileFormat"
              width="326px"
            />
          </Flex>
          <Flex justify="space-between" gap="24px" margin="51px 0 0">
            <OutlinedButton onClick={() => reset(formik)} width="100%" type="button">
              {t('exportLogs.cancel')}
            </OutlinedButton>
            <FilledButton
              isLoading={formik.isSubmitting}
              disabled={!formik.dirty}
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
