import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'

import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Text } from '@peiko/components/Text'
import { RadioButton } from '@peiko/components/inputs/RadioButton/RadioButton'
import { useAuth } from '@/features/common/user'
import { ERoles } from '@/constants/profile'
import { createManagerValidationSchema } from '@/utils/validation'
import { TUserRoles, USER_ROLES } from '@/types/roles'
import {
  asyncEditManager,
  selectInitFormData,
  selectEditManagerIsLoading,
} from '../../store/edit-manager'

type TFormValues = {
  email?: string
  username: string
  password?: string
  hideLeadPhones?: string
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
      hideLeadPhones: 'false',
    },
    validationSchema: createManagerValidationSchema.omit(
      [USER_ROLES.ADMIN as TUserRoles, USER_ROLES.SUPERADMIN as TUserRoles].includes(
        user?.role ?? USER_ROLES.AGENT,
      )
        ? ['email', 'password']
        : [],
    ),
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
        hideLeadPhones: String(initFormData.hideLeadPhones),
      })
    }
  }, [initFormData])

  const isChanged = () =>
    formik.values.email !== initFormData?.email ||
    formik.values.username !== initFormData?.username ||
    formik.values.password ||
    String(formik.values.hideLeadPhones) !== String(initFormData?.hideLeadPhones)

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            {
              (user?.role === ERoles.ADMIN,
              ERoles.SUPERADMIN && (
                <FormikInput
                  size="s"
                  name="email"
                  label={{ label: t('edit-manager.email') }}
                  id="email"
                  formik={formik}
                  width={326}
                  styles={{ padding: '0 14px' }}
                />
              ))
            }
            <FormikInput
              size="s"
              name="username"
              label={{ label: t('edit-manager.username') }}
              id="username"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            {
              (user?.role === ERoles.ADMIN,
              ERoles.SUPERADMIN && (
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
              ))
            }
            {user?.role && ['admin', 'superadmin'].includes(user.role) && (
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
