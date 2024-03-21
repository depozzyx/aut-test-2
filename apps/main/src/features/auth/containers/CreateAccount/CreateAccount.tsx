import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { Card } from '@peiko/components/Card'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { TextButton } from '@peiko/components/buttons/TextButton'
import { RadioButton } from '@peiko/components/inputs/RadioButton'
import { ROUTES } from '@/constants/routes'
import { AuthButtons } from '../../components/AuthButtons'

export const CreateAccount: FC = () => {
  const { t } = useTranslation('auth')

  const [step, setStep] = useState<number>(0)
  const [, setRole] = useState<string>('11')

  const handleNextScreen = () => {
    setStep((prevState) => prevState + 1)
  }

  const onChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value)
  }

  const handleBack = () => {
    setStep(0)
  }

  const buttons = [
    {
      text: t('btn-sign-up-number'),
    },
    {
      text: t('btn-sign-up-google'),
    },
    {
      text: t('btn-sign-up-apple'),
    },
    {
      text: t('btn-sign-up-whatsApp'),
    },
  ]

  const roleSelection = () => (
    <>
      <Text styles={{ marginBottom: '16px' }}>{t('i-am')}</Text>
      <Box styles={{ display: 'flex', marginBottom: '16px' }}>
        <RadioButton
          inputProps={{
            value: '11',
            defaultChecked: true,
          }}
          label="MetaAgent"
          name="radio1"
          onChange={onChangeRole}
        />
        <RadioButton
          inputProps={{
            value: '12',
          }}
          label="Investor"
          name="radio1"
          onChange={onChangeRole}
        />
      </Box>
      <FilledButton size="m" width="100%" maxWidth="404px" onClick={handleNextScreen}>
        {t('btn-sign-up-telegram')}
      </FilledButton>
      <AuthButtons buttons={buttons} />
      <Box styles={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('already-have-account')}</Text>
        <TextButton link={{ href: ROUTES.SIGN_IN }}>{t('log-in')}</TextButton>
      </Box>
    </>
  )

  const createAccount = () => (
    <>
      <Text styles={{ marginBottom: '16px' }}>{t('sign-up-desc')}</Text>
      <FilledButton
        link={{
          href: 'http://t.me/goldevrobot?start=login_investor',
        }}
        size="m"
        width="100%"
        maxWidth="404px"
      >
        {t('btn-open-telegram')}
      </FilledButton>
    </>
  )

  const components = [roleSelection, createAccount]

  return (
    <Card styles={{ width: '100%', maxWidth: '516px', margin: '0 auto' }}>
      <Box styles={{ width: '100%', maxWidth: '404px', margin: '0 auto' }}>
        {step > 0 && (
          <TextButton size="m" onClick={handleBack}>
            {t('back')}
          </TextButton>
        )}
        <Text styles={{ marginBottom: '16px' }}>{t('create-account')}</Text>
        {components[step]()}
      </Box>
    </Card>
  )
}
