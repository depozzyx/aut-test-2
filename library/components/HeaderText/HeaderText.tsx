import { FC, CSSProperties } from 'react'
import styled from 'styled-components'
import { Text, TText } from '@peiko/components/Text'

type THeaderText = TText & {
  mainText: string | JSX.Element
  secondText?: string | JSX.Element
  textAlign?: CSSProperties['textAlign']
  maxWidth?: CSSProperties['maxWidth']
}

const SText = styled(Text)<THeaderText>`
  display: inline-block;
  width: 100%;
  max-width: ${(props) => props.maxWidth || '100%'};
  text-align: ${(props) => props.textAlign || 'center'};
  &::after {
    content: attr(data-end);
    color: ${(props) => props.theme.palette.base300};
  }
`

export const HeaderText: FC<THeaderText> = ({ secondText, ...props }) => (
  <SText data-end={secondText} {...props}>
    {props.mainText}
  </SText>
)
