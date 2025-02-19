import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@peiko/types/formik'
import { Checkbox } from '@peiko/components/inputs/checkboxes/Checkbox/Checkbox'
import { createLeadsGroups } from '../../store/leads'

export const CreateLeadsGroup: FC = () => {
  const { t } = useTranslation('leads-list')
  const { modalState, resetModals } = useModals()
  const { dispatch } = useRedux()
  const showModal =
    modalState?.modalName === MODAL_NAMES.CREATE_LEADS_GROUP && modalState.isOpen

  const reset = (formik: TFormik) => {
    resetModals()
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      active: false,
    },
    validationSchema: yup.object().shape({
      name: validation.required,
    }),
    onSubmit: (formData) => {
      dispatch(
        createLeadsGroups({
          formData,
          formik,
          onSuccess: () => reset(formik),
        }),
      )
    },
  })

  return (
    <ModalMessage
      title={<Text>{t('createLeadsGroup.title')}</Text>}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="582px"
    >
      <Box styles={{ marginTop: '40px' }}>
        <form onSubmit={formik.handleSubmit}>
          <Flex justify="center">
            <Flex direction="column" gap={20}>
              <FormikInput
                label={{ label: t('createLeadsGroup.label') }}
                placeholder={t('createLeadsGroup.placeholder')}
                formik={formik}
                name="name"
                width="326px"
              />
              <Checkbox
                size="s"
                label={`${
                  formik.values.active
                    ? t('statuses.lead-list.active')
                    : t('statuses.lead-list.inactive')
                }`}
                value={formik.values.active}
                onChange={(e) => formik.setFieldValue('active', e.value)}
                name="numbers"
              />
            </Flex>
          </Flex>
          <Flex justify="space-between" gap="24px" margin="51px 0 0">
            <OutlinedButton onClick={() => reset(formik)} width="100%" type="button">
              {t('createLeadsGroup.cancel')}
            </OutlinedButton>
            <FilledButton
              isLoading={formik.isSubmitting}
              disabled={!formik.dirty || !formik.isValid}
              width="100%"
              type="submit"
            >
              {t('createLeadsGroup.submit')}
            </FilledButton>
          </Flex>
        </form>
      </Box>
    </ModalMessage>
  )
}
