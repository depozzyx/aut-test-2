import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'

import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import {
  createAgentValidationSchema,
  createManagerValidationSchema,
} from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import { Snackbar } from '@/components/Snackbar'
import {
  asyncCreateUser,
  selectCreateUserIsLoading,
} from '@/features/users/store/create-user'
import { ERoles } from '@/constants/profile'
import { RadioButton } from '@peiko/components/inputs/RadioButton/RadioButton'
import { Text } from '@peiko/components/Text'
import { generateRandomString } from '@/utils/generate-random-string.helper'
import { asyncGetUsersList } from '../../../../store/users'
import { roleUserTranslationKey } from '../../../../constants'
import { TUserFormData } from '../../../../types'

const FormikInput = dynamic(
  () =>
    import('@peiko/components/inputs/formik-adapters/FormikInput').then(
      (mod) => mod.FormikInput,
    ),
  {
    ssr: false,
  },
)

export const CreateNewUserForm = ({ role }: { role: ERoles }): JSX.Element => {
  const roleMap: Record<
    ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN,
    { validationSchema: any }
  > = {
    [ERoles.AGENT]: {
      validationSchema: createAgentValidationSchema,
    },
    [ERoles.MANAGER]: {
      validationSchema: createManagerValidationSchema,
    },
    [ERoles.ADMIN]: {
      validationSchema: createManagerValidationSchema,
    },
  }
  if (!(role in roleMap)) {
    throw new Error(`Unsupported role: ${role}`)
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation(
    roleUserTranslationKey[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN],
  )
  const { select, dispatch } = useRedux()
  const isLoading = select(selectCreateUserIsLoading)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      hideLeadPhones: 'true',
    } as TUserFormData,
    validationSchema:
      roleMap[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN].validationSchema,
    onSubmit: (formData) => {
      dispatch(
        asyncCreateUser(
          { role, formData, formik },
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

  const generatePassword = () => {
    const password = generateRandomString(8, 'aA#!')
    formik.setFieldValue('password', password)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      justify="center"
      direction="column"
      gap={40}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" align="center" gap={40} margin="40px 0 0 0">
          <Flex gap={24}>
            <Flex direction="column" gap={16} maxWidth="326px" width="100%">
              <FormikInput
                size="s"
                name="username"
                label={{ label: t('create.username') }}
                id="name"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <FormikInput
                size="s"
                name="email"
                label={{ label: t('create.email') }}
                id="email"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              <FormikInput
                size="s"
                name="password"
                label={{ label: t('create.password') }}
                id="password"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
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
            <FilledButton type="button" onClick={generatePassword} width="180px">
              {t('create.generate-password')}
            </FilledButton>
            <FilledButton
              type="submit"
              width="180px"
              isLoading={isLoading}
              disabled={!formik.dirty || !formik.isValid || isLoading}
            >
              {t('create.action')}
            </FilledButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  )
}
