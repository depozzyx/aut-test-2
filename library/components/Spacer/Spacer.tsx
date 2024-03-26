import React, { CSSProperties } from 'react'
import styled, { css } from 'styled-components'
import { IBreakpoints, mediaQueries } from '@peiko/styles/breakpoints'

type Props = {
  margin?: string
  padding?: string
}

type TSpacerProps = {
  className?: string
  textAlign?: CSSProperties['textAlign']
} & Partial<IBreakpoints<Props>>

const StyledSpacer = styled.div<TSpacerProps>((props) => {
  const base = `
  display: block;
  text-align: ${props.textAlign || 'left'};
`
  const { xs, sm, md, lg } = props
  return css`
    ${base}
    ${xs &&
    `${mediaQueries.xs} {
      margin: ${xs?.margin || 'unset'};
      padding: ${xs?.padding || 'unset'};
    }`}

    ${props.sm &&
    `${mediaQueries.sm} {
      margin: ${sm?.margin || 'unset'};
      padding: ${sm?.padding || 'unset'};
     }`}

     ${props.md &&
    `${mediaQueries.md} {
      margin: ${md?.margin || 'unset'};
      padding: ${md?.padding || 'unset'};
     }`}

     ${props.lg &&
    `${mediaQueries.lg} {
      margin: ${lg?.margin || 'unset'};
      padding: ${lg?.padding || 'unset'};
     }`}
  `
})

export const Spacer: React.FC<TSpacerProps> = (props) => {
  const { children, ...others } = props
  return <StyledSpacer {...others}>{children}</StyledSpacer>
}
