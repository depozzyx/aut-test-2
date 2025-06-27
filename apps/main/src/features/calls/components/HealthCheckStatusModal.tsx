import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled, { css } from 'styled-components'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { CheckIcon } from '@/components/icons/CheckIcon'
import { SettingsIcon } from '@/components/icons/SettingsIcon'
import { NEXT_PUBLIC_SUPPORT_EMAIL_CONTACT } from '@/constants/config'
import { THealthStatus, THealthCheckStep } from '../Calls'

const ProgressBar = styled.div<{ progress: number; color: string }>`
  width: 100%;
  height: 5px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.base4};
  position: relative;
  margin-top: 8px;
  margin-bottom: 4px;
  overflow: hidden;
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ progress }) => progress ?? 0}%;
    height: 100%;
    background-color: ${({ theme, color }) => (theme.palette as any)[color]};
    border-radius: 6px;
    transition: width 0.3s ease;
  }
`

const Row = styled(Flex)<{ active?: boolean; status?: THealthCheckStep }>`
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
  ${({ active, status }) =>
    !active &&
    status !== 'success' &&
    css`
      opacity: 0.5;
    `}
`

const StatusIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 8px;
`

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.palette.main13};
  margin-top: 4px;
  margin-left: 0;
`

const Button = styled.button<{ disabled?: boolean; orange?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme, disabled, orange }) =>
    // eslint-disable-next-line no-nested-ternary
    disabled ? theme.palette.base4 : orange ? theme.palette.main : theme.palette.main2};
  color: ${({ theme, disabled }) => (disabled ? theme.palette.base2 : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    background-color: ${({ theme, disabled, orange }) =>
      // eslint-disable-next-line no-nested-ternary
      disabled
        ? theme.palette.base4
        : orange
        ? theme.palette.main16
        : theme.palette.main3};
  }
`

// const SupportLink = styled.a`
//   color: ${({ theme }) => theme.palette.main2};
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// `

type Props = {
  status: THealthStatus
  onClose: () => void
  onRetry: () => void
  open?: boolean
}

const supportEmailContact = NEXT_PUBLIC_SUPPORT_EMAIL_CONTACT
if (!supportEmailContact) {
  console.debug('Support Email Contact not provided')
}

const getBarColor = (step: THealthCheckStep) => {
  if (step === 'success') return 'main11'
  if (step === 'error') return 'main13'
  if (step === 'loading') return 'main2'
  return 'main4'
}

type TStep = {
  status: THealthCheckStep
  progress: number
  error?: string
  details?: string
  message?: string
}
const DEFAULT_TIMEOUT = 10

export const HealthCheckStatusModal = ({
  status,
  onClose,
  onRetry,
  open = true,
}: Props): JSX.Element | null => {
  const { t } = useTranslation('calls')
  const [retryTimeout, setRetryTimeout] = useState(DEFAULT_TIMEOUT)

  useEffect(() => {
    if (retryTimeout > 0) {
      const timer = setTimeout(() => setRetryTimeout((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [retryTimeout])

  if (!open) return null

  const handleRetry = () => {
    if (retryTimeout === 0) {
      setRetryTimeout(DEFAULT_TIMEOUT)
      onRetry()
    }
  }

  const getActiveStep = () => {
    if (status.api.status === 'loading' || status.api.status === 'pending') return 0
    if (
      status.api.status === 'success' &&
      (status.websocket.status === 'loading' || status.websocket.status === 'pending')
    )
      return 1
    if (status.api.status === 'success' && status.websocket.status === 'success') return 2
    return 0
  }
  const activeStep = getActiveStep()
  const allSuccess =
    status.api.status === 'success' &&
    status.websocket.status === 'success' &&
    status.sip.status === 'success'

  const wsError = status.websocket.error

  const hasErrors =
    status.api.status === 'error' ||
    status.websocket.status === 'error' ||
    status.sip.status === 'error'

  const renderRow = (
    n: number,
    label: string,
    step: TStep,
    _?: undefined,
    active?: boolean,
  ) => (
    <Row
      direction="column"
      align="start"
      active={active}
      status={step.status}
      styles={{ width: '100%' }}
    >
      <Flex align="center" gap="8px" styles={{ width: '100%' }}>
        <Text variant="f8" styles={{ minWidth: '120px', textAlign: 'left' }}>
          {`${n}. ${label}`}
        </Text>
        <ProgressBar progress={step.progress} color={getBarColor(step.status)} />
        <Flex
          align="center"
          gap="8px"
          styles={{ minWidth: '80px', justifyContent: 'flex-end' }}
        >
          {active && step.status === 'loading' && (
            <Text variant="f10" color="main2">
              {`${Math.round(step.progress)}%`}
            </Text>
          )}
          {step.status === 'success' && (
            <StatusIcon>
              <CheckIcon />
            </StatusIcon>
          )}
        </Flex>
      </Flex>
      {step.status === 'error' && (
        <ErrorText variant="f10">
          {(() => {
            if (n === 2) return wsError
            return step.error
          })()}
        </ErrorText>
      )}
    </Row>
  )

  return (
    <ModalMessage
      title={
        <Flex align="center" justify="space-between" styles={{ width: '100%' }}>
          <Text tag="span" variant="f2">
            {t('health-check.system-check-title')}
          </Text>
          <SettingsIcon width={24} height={24} color="main2" />
        </Flex>
      }
      open
      containerWidth="100%"
      maxWidth="576px"
    >
      <Flex direction="column" gap={24} styles={{ paddingTop: '24px', width: '100%' }}>
        {renderRow(1, 'PBX API', status.api, undefined, activeStep === 0)}
        {status.api.status === 'success'
          ? renderRow(2, 'PBX WebSocket', status.websocket, undefined, activeStep === 1)
          : renderRow(
              2,
              'PBX WebSocket',
              { ...status.websocket, status: 'pending', progress: 0 },
              undefined,
              false,
            )}
        {status.api.status === 'success' && status.websocket.status === 'success'
          ? renderRow(3, 'SIP', status.sip, undefined, activeStep === 2)
          : renderRow(
              3,
              'SIP',
              { ...status.sip, status: 'pending', progress: 0 },
              undefined,
              false,
            )}
        {hasErrors && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={4}
            styles={{ marginTop: '16px' }}
          >
            <Text variant="f10" color="main22" styles={{ textAlign: 'center' }}>
              {t('health-check.support-message')} <b>{supportEmailContact}</b>
            </Text>
          </Flex>
        )}
        {/* eslint-disable-next-line no-nested-ternary */}
        {allSuccess ? (
          <Button onClick={onClose}>{t('health-check.close')}</Button>
        ) : hasErrors ? (
          <Flex align="center" justify="center" gap={24} styles={{ width: '100%' }}>
            <Button onClick={onClose} style={{ width: '202px' }} orange>
              {t('health-check.close')}
            </Button>
            <Button
              onClick={handleRetry}
              disabled={retryTimeout > 0}
              style={{ width: '202px' }}
            >
              {retryTimeout > 0
                ? t('health-check.retry-timeout', { seconds: retryTimeout })
                : t('health-check.retry')}
            </Button>
          </Flex>
        ) : (
          <Button onClick={handleRetry} disabled={retryTimeout > 0}>
            {retryTimeout > 0
              ? t('health-check.retry-timeout', { seconds: retryTimeout })
              : t('health-check.retry')}
          </Button>
        )}
      </Flex>
    </ModalMessage>
  )
}
