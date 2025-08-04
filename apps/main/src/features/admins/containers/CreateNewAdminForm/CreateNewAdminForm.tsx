import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import React, { useState } from 'react'

import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { createManagerValidationSchema } from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncCreateAdmin,
  selectCreateAdminIsLoading,
} from '@/features/admins/store/create-admin'
import { asyncGetAdminsList } from '@/features/admins/store/admins'
import { Snackbar } from '@/components/Snackbar'

export const CreateNewAdminForm = (): JSX.Element => {
  const { t } = useTranslation('admins')
  const { select, dispatch } = useRedux()
  const isLoading = select(selectCreateAdminIsLoading)
  const [errorMessage, setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: createManagerValidationSchema,
    onSubmit: (formData) => {
      dispatch(
        asyncCreateAdmin(
          { formData, formik },
          () =>
            dispatch(
              asyncGetAdminsList({
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
                label={{ label: t('create-admin.username') }}
                id="username"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <FormikInput
                size="s"
                name="email"
                label={{ label: t('create-admin.email') }}
                id="name"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <FormikInput
                size="s"
                name="password"
                label={{ label: t('create-admin.password') }}
                id="password"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
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
              {t('create-admin.action')}
            </FilledButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  )
}
