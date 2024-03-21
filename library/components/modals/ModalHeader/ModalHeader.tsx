import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { InfoIcon } from '@peiko/components/icons/InfoIcon'
import { SuccessIcon } from '@peiko/components/icons/SuccessIcon'
import { Text } from '@peiko/components/Text'
import { Box } from '@peiko/components/Box'
import * as S from './ModalHeader.styles'
import { THeaderProps } from './types'

const ICON_DIMENSIONS = {
  width: '60px',
  height: '60px',
}

export const ModalHeader: React.FC<THeaderProps> = ({
  title,
  description,
  alignItems,
  gap,
  status,
  variantTitle,
  variantDesc,
  Icon,
  iconDimensions = {},
}) => {
  const { t } = useTranslation('modal-message')

  const textTitle = useMemo(() => {
    if (title) return title
    if (status) return t(status)
  }, [title, status])

  const StatusIcon = useMemo(() => {
    switch (status) {
      case 'success':
        return SuccessIcon
      case 'info':
        return InfoIcon
      case 'error':
        return ErrorIcon
      default:
        return SuccessIcon
    }
  }, [status])

  const hasTitle = title || status
  const hasStatusIcon = status && !Icon

  return (
    <S.Wrapper alignItems={alignItems} gap={gap || '16px'}>
      {hasStatusIcon && (
        <Box styles={{ alignSelf: 'center' }}>
          <StatusIcon {...ICON_DIMENSIONS} {...iconDimensions} />
        </Box>
      )}
      {Icon && (
        <Box styles={{ alignSelf: 'center' }}>
          <Icon {...ICON_DIMENSIONS} {...iconDimensions} />
        </Box>
      )}
      {hasTitle && <Text variant={variantTitle || 'f2'}>{textTitle}</Text>}
      {description && <Text variant={variantDesc || 'f5'}>{description}</Text>}
    </S.Wrapper>
  )
}
