import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { validation } from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncCreateManager,
  selectCreateManagerIsLoading,
} from '@/features/managers/store/create-manager'
import { asyncGetManagerList } from '@/features/managers/store/managers'

export const CreateNewManagerForm = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  const isLoading = select(selectCreateManagerIsLoading)

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: validation.email.required(),
      username: validation.required,
      password: validation.password,
    }),
    onSubmit: (formData) => {
      dispatch(
        asyncCreateManager({ formData, formik }, () =>
          dispatch(
            asyncGetManagerList({
              page: 1,
              limit: 8,
              orderBy: 'DESC',
              sortBy: 'createdAt',
            }),
          ),
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
                name="email"
                label={{ label: t('create-manager.email') }}
                id="name"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
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
                name="password"
                label={{ label: t('create-manager.password') }}
                id="password"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
            </Flex>
          </Flex>
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
