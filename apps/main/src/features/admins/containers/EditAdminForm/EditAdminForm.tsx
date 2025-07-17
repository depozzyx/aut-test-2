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

import { createManagerValidationSchema } from '@/utils/validation'
import {
  asyncEditAdmin,
  selectInitFormData,
  selectEditAdminIsLoading,
} from '../../store/edit-admin'
import { TUpdateAdmin } from '../../../../api/rest/admin/types'

export const EditAdminForm = (): JSX.Element => {
  const { t } = useTranslation('admins')
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()

  const { isLoading, initFormData } = select(
    createStructuredSelector({
      isLoading: selectEditAdminIsLoading,
      initFormData: selectInitFormData,
    }),
    shallowEqual,
  )

  const formik = useFormik<TUpdateAdmin>({
    initialValues: {
      email: '',
      username: '',
      password: undefined,
    },
    validationSchema: createManagerValidationSchema,
    onSubmit: (formData) => {
      const payload = { ...formData }
      if (!formData.password) {
        payload.password = undefined
      }
      dispatch(asyncEditAdmin({ formData: payload, formik }))
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
            <FormikInput
              size="s"
              name="username"
              label={{ label: t('edit-admin.username') }}
              id="username"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikInput
              size="s"
              name="email"
              label={{ label: t('edit-admin.email') }}
              id="email"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikInput
              size="s"
              name="password"
              type="password"
              label={{ label: t('edit-admin.password') }}
              id="password"
              placeholder="********"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.dirty || !isChanged() || !formik.isValid || isLoading}
            width="236px"
            isLoading={isLoading}
          >
            {t('edit-admin.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('edit-admin.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
