import { useFormik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import * as yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'

import { validation } from '@/utils/validation'
import React, { useEffect } from 'react'

import { useAuth } from '@/features/common/user'
import { ERoles } from '@/constants/profile'
import {
  asyncEditManager,
  selectInitFormData,
  selectEditManagerIsLoading,
} from '../../store/edit-manager'

type TFormValues = {
  email?: string
  username: string
  password?: string
}

export const EditManagerForm = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()
  const { user } = useAuth()

  const { isLoading, initFormData } = select(
    createStructuredSelector({
      isLoading: selectEditManagerIsLoading,
      initFormData: selectInitFormData,
    }),
    shallowEqual,
  )

  const formik = useFormik<TFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: undefined,
    },
    validationSchema: yup.object().shape({
      email: validation.email,
      username: validation.required,
      password: yup
        .string()
        .nullable()
        .test(
          'password-strength',
          'Password must be at least 8 characters long, include numbers, uppercase and lowercase letters, and have no spaces',
          (value) =>
            !value || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,32}$/.test(value),
        ),
    }),
    onSubmit: (formData) => {
      const payload = { ...formData }
      if (!formData.password) {
        payload.password = undefined
      }
      dispatch(asyncEditManager({ formData: payload, formik }))
    },
  })

  useEffect(() => {
    if (initFormData) {
      formik.setValues({
        username: initFormData.username,
        email: initFormData.email,
      })
    }
  }, [initFormData])

  const isChanged = () =>
    formik.values.email !== initFormData?.email ||
    formik.values.username !== initFormData?.username ||
    formik.values.password

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            {user?.role === ERoles.ADMIN && (
              <FormikInput
                size="s"
                name="email"
                label={{ label: t('edit-manager.email') }}
                id="email"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
            )}
            <FormikInput
              size="s"
              name="username"
              label={{ label: t('edit-manager.username') }}
              id="username"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            {user?.role === ERoles.ADMIN && (
              <FormikInput
                size="s"
                name="password"
                type="password"
                label={{ label: t('edit-manager.password') }}
                id="password"
                placeholder="********"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
            )}
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.dirty || !isChanged() || !formik.isValid || isLoading}
            width="236px"
            isLoading={isLoading}
          >
            {t('edit-manager.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('edit-manager.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
