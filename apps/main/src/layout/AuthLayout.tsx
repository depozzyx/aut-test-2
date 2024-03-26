import React from 'react'
import styled, { CSSProperties, css, createGlobalStyle } from 'styled-components'

type Props = {
  minHeight?: CSSProperties['minHeight']
  maxWidth?: CSSProperties['maxWidth']
  padding?: CSSProperties['padding']
  justifyContent?: CSSProperties['justifyContent']
}

type PageLayoutProps = Props & Partial<Props>

const BodyColor = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.palette.main};
  }
`

export const ContentWrapper = styled.div<PageLayoutProps>(
  (props) => css`
    display: flex;
    margin: 0 auto;
    background-color: ${props.theme.palette.base};
    min-height: ${props.minHeight || 'calc(100vh - var(--header-height))'};
    overflow-x: hidden;
    align-items: center;
    width: 100%;
    height: 100vh;
  `,
)

export const AuthLayout: React.FC<PageLayoutProps> = ({ children, ...props }) => (
  <>
    <BodyColor />
    <ContentWrapper {...props}>{children}</ContentWrapper>
  </>
)
