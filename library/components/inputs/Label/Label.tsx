import React from 'react'
import { ErrorText } from '@peiko/components/inputs/ErrorText'
import { TLabelProps } from '../types'
import * as S from './Label.styles'

export const Label: React.FC<TLabelProps> = ({
  label,
  children,
  htmlFor,
  style,
  error,
  color,
  onClick,
  errorAlign,
  required,
  readOnly,
}) => (
  <>
    {label && (
      <S.TopCont>
        <S.Label
          color={color}
          style={style}
          required={required}
          htmlFor={!readOnly ? htmlFor : undefined}
          readOnly={readOnly}
          onClick={onClick}
        >
          <S.Text variant="f8">{label}</S.Text>
        </S.Label>
      </S.TopCont>
    )}

    {children}

    {error && <ErrorText textAlign={errorAlign}>{error}</ErrorText>}
  </>
)
