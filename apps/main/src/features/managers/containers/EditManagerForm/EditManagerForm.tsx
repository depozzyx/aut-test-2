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

import {
  asyncEditManager,
  selectInitFormData,
  selectEditManagerIsLoading,
} from '@/features/managers/store/edit-manager'
import { validation } from '@/utils/validation'

export const EditManagerForm = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()

  const { isLoading, initFormData } = select(
    createStructuredSelector({
      isLoading: selectEditManagerIsLoading,
      initFormData: selectInitFormData,
    }),
    shallowEqual,
  )

  const formik = useFormik({
    initialValues: {
      // email: initFormData?.email || '',
      username: initFormData?.username || '',
    },
    validationSchema: yup.object().shape({
      // email: validation.email,
      username: validation.required,
    }),
    onSubmit: (formData) => {
      dispatch(asyncEditManager({ formData, formik }))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            {/* <FormikInput
              size="s"
              name="email"
              label={{ label: t('edit-manager.email') }}
              id="email"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            /> */}
            <FormikInput
              size="s"
              name="username"
              label={{ label: t('edit-manager.username') }}
              id="username"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.dirty || !formik.isValid || isLoading}
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
