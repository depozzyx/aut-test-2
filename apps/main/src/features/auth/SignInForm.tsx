import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { BaseImage } from '@peiko/components/BaseImage'
import { Text } from '@peiko/components/Text'
import logo from '@/assets/img/logo.png'
import { useRedux } from '@/hooks/use-redux'
import { Container, LogoWrapper } from './styles/SignIn.styled'
import { signInAsync } from './store/sign-in'

export const SignInForm: FC = () => {
  const { t } = useTranslation('auth')

  const { dispatch } = useRedux()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: validation.required,
      password: validation.password,
    }),
    onSubmit: (formData) => {
      dispatch(signInAsync({ formData, formik }))
    },
  })

  return (
    <Container>
      <LogoWrapper>
        <BaseImage src={logo} width={146} height={50} />
        <Text>{t('logo-name')}</Text>
      </LogoWrapper>
    </Container>
  )
}
