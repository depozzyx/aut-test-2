import styled from 'styled-components'
import { Text as TextComponent } from '@peiko/components/Text'
import { TErrorText } from './types'

export const Text = styled(TextComponent)<TErrorText>`
  text-align: ${({ textAlign }) => textAlign ?? 'left'};
  margin: ${({ margin }) => margin ?? '2px 0 0 0'};
`
