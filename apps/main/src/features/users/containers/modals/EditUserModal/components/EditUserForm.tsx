import { useState } from 'react'
import { useFormik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import {
  editAgentValidationSchema,
  editManagerValidationSchema,
} from '@/utils/validation'
import { useAuth } from '@/features/common/user'
import { Snackbar } from '@/components/Snackbar'
import { ERoles } from '@/constants/profile'

import { RadioButton } from '@peiko/components/inputs/RadioButton/RadioButton'
import { Text } from '@peiko/components/Text'
import { asyncGetUsersList } from '../../../../store/users'
import {
  asyncUpdateUser,
  selectInitFormData,
  selectUpdateUserIsLoading,
} from '../../../../store/edit-user'
import { roleUserTranslationKey } from '../../../../constants'
import { TUserFormData } from '../../../../types'

export const EditUserForm = ({ role }: { role: ERoles }): JSX.Element => {
  const roleMap: Record<
    ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN,
    { validationSchema: any }
  > = {
    [ERoles.AGENT]: {
      validationSchema: editAgentValidationSchema,
    },
    [ERoles.MANAGER]: {
      validationSchema: editManagerValidationSchema,
    },
    [ERoles.ADMIN]: {
      validationSchema: editManagerValidationSchema,
    },
  }
  if (!(role in roleMap)) {
    throw new Error(`Unsupported role: ${role}`)
  }

  const { t } = useTranslation(
    roleUserTranslationKey[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN],
  )
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()
  const { user } = useAuth()

  const [errorMessage, setErrorMessage] = useState('')
  const { isLoading, initFormData } = select(
    createStructuredSelector({
      isLoading: selectUpdateUserIsLoading,
      initFormData: selectInitFormData,
    }),
    shallowEqual,
  )

  const formik = useFormik({
    initialValues: {
      username: initFormData?.username || '',
      email: initFormData?.email || '',
      password: undefined,
      hideLeadPhones: initFormData?.hideLeadPhones || 'false',
    } as TUserFormData,
    validationSchema:
      roleMap[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN].validationSchema,
    onSubmit: (formData) => {
      dispatch(
        asyncUpdateUser(
          { formData, formik, role },
          () => {
            setErrorMessage('')
            dispatch(
              asyncGetUsersList(role, {
                page: 1,
                limit: 10,
              }),
            )
          },
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
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikInput
              size="s"
              name="username"
              label={{ label: t('edit.username') }}
              id="username"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikInput
              size="s"
              name="email"
              label={{ label: t('edit.email') }}
              id="email"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            {user?.role && ['admin', 'superadmin', 'manager'].includes(user.role) && (
              <FormikInput
                size="s"
                name="password"
                type="password"
                label={{ label: t('edit.password') }}
                id="password"
                placeholder="********"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
            )}
          </Flex>
        </Flex>
        {role === ERoles.MANAGER && (
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
              <Text>{t('create.showLeadPhones')}</Text>
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
              <Text>{t('create.hideLeadPhones')}</Text>
            </Flex>
          </Flex>
        )}
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
            disabled={!formik.dirty || !formik.isValid || isLoading}
            width="236px"
            isLoading={isLoading}
          >
            {t('edit.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('edit.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
