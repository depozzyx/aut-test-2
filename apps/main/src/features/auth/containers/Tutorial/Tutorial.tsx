import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'
import { Card } from '@peiko/components/Card'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { TextButton } from '@peiko/components/buttons/TextButton'
import { useIsomorphicLayoutEffect } from 'react-use'
import { tutorial } from '@/browser-api/tutorial'
import { screens } from './data'

const Dot = styled.div<{ current: boolean }>(
  ({ current }) => `
    background: ${current ? '#6D6E70' : '#fff'};
    height: 6px;
    width: 6px;
    margin: 2px;
    border-radius: 50%;
  `,
)

type TTutorial = {
  handleStarted: () => void
}

export const Tutorial: FC<TTutorial> = ({ handleStarted }) => {
  const { t } = useTranslation('tutorial')

  const [step, setStep] = useState<number>(0)

  const handleNextScreen = () => {
    if (step !== screens.length - 1) {
      setStep((prevState) => prevState + 1)
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (tutorial.get()) {
      handleStarted()
    }
  }, [])

  const handleBack = () => {
    setStep(0)
  }

  const handleSkip = () => {
    handleStarted()
    tutorial.set()
  }

  return (
    <Card
      styles={{
        width: '100%',
        maxWidth: '516px',
        margin: '0 auto',
      }}
    >
      {step === screens.length - 1 && (
        <TextButton size="m" onClick={handleBack}>
          {t('back')}
        </TextButton>
      )}
      <Card styles={{ margin: '0 auto' }}>
        <Box>
          <Text>{t(screens[step].title)}</Text>
          <Text>{t(screens[step].description)}</Text>
        </Box>
      </Card>
      <Box styles={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        {screens.map((item, index) => (
          <Dot key={Number(index)} current={Boolean(index === step)} />
        ))}
      </Box>

      <Box
        styles={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {step !== screens.length - 1 ? (
          <>
            <FilledButton
              size="m"
              width="100%"
              maxWidth="404px"
              styles={{ marginBottom: '16px' }}
              onClick={handleNextScreen}
            >
              {t('next')}
            </FilledButton>

            <OutlinedButton size="m" width="100%" maxWidth="404px" onClick={handleSkip}>
              {t('skip')}
            </OutlinedButton>
          </>
        ) : (
          <OutlinedButton size="m" width="100%" maxWidth="404px" onClick={handleStarted}>
            {t('get-started')}
          </OutlinedButton>
        )}
      </Box>
    </Card>
  )
}
