import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import React, { useState } from 'react'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { RadioButton } from '@peiko/components/inputs/RadioButton/RadioButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { createManagerValidationSchema } from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncCreateManager,
  selectCreateManagerIsLoading,
} from '@/features/managers/store/create-manager'
import { asyncGetManagerList } from '@/features/managers/store/managers'
import { Snackbar } from '@/components/Snackbar'

export const CreateNewManagerForm = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  const isLoading = select(selectCreateManagerIsLoading)
  const [errorMessage, setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      hideLeadPhones: 'false',
    },
    validationSchema: createManagerValidationSchema,
    onSubmit: (formData) => {
      dispatch(
        asyncCreateManager(
          { formData, formik },
          () =>
            dispatch(
              asyncGetManagerList({
                page: 1,
                limit: 10,
              }),
            ),
          (status, data) => {
            if (status === 400 && data.message) {
              setErrorMessage(data.message)
              return true
            }
            return false
          },
        ),
      )
    },
  })

  return (
    <Flex width="100%" height="100%" align="center" justify="center">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
          <Flex gap={24}>
            <Flex direction="column" gap={16} maxWidth="326px" width="100%">
              <FormikInput
                size="s"
                name="username"
                label={{ label: t('create-manager.username') }}
                id="username"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <FormikInput
                size="s"
                name="email"
                label={{ label: t('create-manager.email') }}
                id="name"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <FormikInput
                size="s"
                name="password"
                label={{ label: t('create-manager.password') }}
                id="password"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <Flex gap="22px" justify="start" width={326}>
                <Flex
                  gap="4px"
                  styles={{ cursor: 'pointer' }}
                  onClick={() => formik.setFieldValue('hideLeadPhones', 'false')}
                >
                  <RadioButton
                    name="true"
                    onChange={() => formik.setFieldValue('hideLeadPhones', 'false')}
                    inputProps={{
                      value: 'false',
                      checked: formik.values.hideLeadPhones === 'false',
                    }}
                  />
                  <Text>{t('create-manager.showLeadPhones')}</Text>
                </Flex>
                <Flex
                  gap="4px"
                  styles={{ cursor: 'pointer' }}
                  onClick={() => formik.setFieldValue('hideLeadPhones', 'true')}
                >
                  <RadioButton
                    name="true"
                    onChange={() => formik.setFieldValue('hideLeadPhones', 'true')}
                    inputProps={{
                      value: 'true',
                      checked: formik.values.hideLeadPhones === 'true',
                    }}
                  />
                  <Text>{t('create-manager.hideLeadPhones')}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {errorMessage && (
            <Snackbar
              status="info"
              onClose={() => setErrorMessage('')}
              message={errorMessage}
              withAnimation={false}
              maxWidth="326px"
            />
          )}
          <Flex align="center" justify="center" gap={24}>
            <FilledButton
              type="submit"
              width="236px"
              isLoading={isLoading}
              disabled={!formik.dirty || !formik.isValid || isLoading}
            >
              {t('create-manager.action')}
            </FilledButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  )
}
