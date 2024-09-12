import useTranslation from 'next-translate/useTranslation'
import { FC, useCallback, useRef, useState } from 'react'
import { CopyIcon } from '@peiko/components/icons/CopyIcon'
import { Text } from '@peiko/components/Text'
import { Container } from './Copy.styled'
import { TInputSizes } from '../../types'

type CopyProps = {
  value: string
  disabled?: boolean
  onClick?: () => void
} & TInputSizes

export const Copy: FC<CopyProps> = ({ value, disabled = false, onClick, size = 'm' }) => {
  const { t } = useTranslation('inputs')
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const iconSize = size === 'm' ? 'm' : 's'

  const setBlur = useCallback(() => {
    if (!buttonRef.current) return
    buttonRef.current.blur()
  }, [])

  const handleClick = async () => {
    if (showSuccess || showError) return

    try {
      await navigator.clipboard.writeText(value)
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 1000)
    } catch (err) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 1000)
    }

    if (onClick) {
      onClick()
    }
  }

  const renderButtonContent = () => {
    if (showSuccess) {
      return (
        <Text variant="f10" color="main11">
          {t('copy-success')}
        </Text>
      )
    }

    if (showError) {
      return (
        <Text variant="f10" color="main13">
          {t('copy-error')}
        </Text>
      )
    }

    return <CopyIcon size={iconSize} />
  }

  return (
    <Container
      disabled={disabled}
      onClick={handleClick}
      onMouseLeave={setBlur}
      role="button"
      tabIndex={disabled ? -1 : 0}
      ref={buttonRef}
    >
      {renderButtonContent()}
    </Container>
  )
}
